'use strict';

const CONTINGENCY_REJECTION_PENALTY = 5000;

/**
 * @param {medichain.network.CompleteStage} tx
 * @transaction
 */
async function CompleteStage(tx) {
    const boughtPackageId = tx.boughtPackageId;
    const boughtPackageRegistry = await getAssetRegistry('medichain.network.BoughtPackage');
    const boughtPackage = await boughtPackageRegistry.get(boughtPackageId);

    const packageId = boughtPackage.packageId;
    const packageRegistry = await getAssetRegistry('medichain.network.Package');
    const mediPackage = await packageRegistry.get(packageId);

    const currentStage = boughtPackage.currentStage;
    const stages = mediPackage.fundamentalProcedureNames;

    const currentStageIndex = stages.indexOf(currentStage);
    const newCurrentStage = stages[currentStageIndex + 1];
    
    boughtPackage.currentStage = newCurrentStage;
    boughtPackage.unverifiedStage = currentStage;

    await boughtPackageRegistry.update(boughtPackage);
}

/**
 * @param {medichain.network.VerifyStage} tx
 * @transaction
 */
async function VerifyStage(tx) {
    const boughtPackageId = tx.boughtPackageId;
    const boughtPackageRegistry = await getAssetRegistry('medichain.network.BoughtPackage');
    const boughtPackage = await boughtPackageRegistry.get(boughtPackageId);

    const packageId = boughtPackage.packageId;
    const packageRegistry = await getAssetRegistry('medichain.network.Package');
    const mediPackage = await packageRegistry.get(packageId);

    const stages = mediPackage.fundamentalProcedureNames;
    const stagesCost = mediPackage.fundamentalProcedureCosts;
    const unverifiedStage = boughtPackage.unverifiedStage;
    const unverifiedStageIndex = stages.indexOf(unverifiedStage);

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getAssetRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const unverifiedStageCost = stagesCost[unverifiedStageIndex];
    const currentHoldAmount = boughtPackage.holdAmount;
    const newHoldAmount = currentHoldAmount - unverifiedStageCost;

    boughtPackage.holdAmount = newHoldAmount;
    boughtPackage.unverifiedStage = "-1";

    const providerWallet = provider.wallet;
    const newProviderWallet = providerWallet + unverifiedStageCost;

    provider.wallet = newProviderWallet;

    await boughtPackageRegistry.update(boughtPackage);
    await providerRegistry.update(provider);
}

/**
 * @param {medichain.network.RaiseContingency} tx
 * @transaction
 */
async function RaiseContingency(tx) {
    const boughtPackageId = tx.boughtPackageId;
    const boughtPackageRegistry = await getAssetRegistry('medichain.network.BoughtPackage');
    const boughtPackage = await boughtPackageRegistry.get(boughtPackageId);

    const packageId = boughtPackage.packageId;
    const packageRegistry = await getAssetRegistry('medichain.network.Package');
    const mediPackage = await packageRegistry.get(packageId);

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getAssetRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const newContingencyName = tx.contingencyName;
    const newContingencyCost = tx.contingencyCost;
    const newContingencyDescription = tx.contingencyDescription;
    const newContingencyTime = tx.ContingencyTime;

    // const unvalidatedContingencyNames = mediPackage.unvalidatedContingencyNames;
    // const unvalidatedContingencyDescriptions = mediPackage.unvalidatedContingencyDescriptions;
    // const unvalidatedContingencyCosts = mediPackage.unvalidatedContingencyCosts;
    // const unvalidatedContingencyTimes = mediPackage.unvalidatedContingencyTimes;

    mediPackage.unvalidatedContingencyNames.push(newContingencyName);
    mediPackage.unvalidatedContingencyDescriptions.push(newContingencyDescription);
    mediPackage.unvalidatedContingencyCosts.push(newContingencyCost);
    mediPackage.unvalidatedContingencyTimes.push(newContingencyTime);

    boughtPackage.unerifiedContingencyName = newContingencyName;

    ++provider.contingenciesProposed;

    await packageRegistry.update(mediPackage);
    await boughtPackage.update(boughtPackage);
    await providerRegistry.update(provider);
}

/**
 * @param {medichain.network.ValidateContingency} tx
 * @transaction
 */
async function ValidateContingency(tx) {
    const unvalidatedContingencyName = tx.contingencyName;

    const boughtPackageId = tx.boughtPackageId;
    const boughtPackageRegistry = await getAssetRegistry('medichain.network.BoughtPackage');
    const boughtPackage = await boughtPackageRegistry.get(boughtPackageId);

    const packageId = boughtPackage.packageId;
    const packageRegistry = await getAssetRegistry('medichain.network.Package');
    const mediPackage = await packageRegistry.get(packageId);

    const unvalidatedContingencyNames = mediPackage.unvalidatedContingencyNames;
    const unvalidatedContingencyIndex = unvalidatedContingencyNames.indexOf(unvalidatedContingencyName);

    mediPackage.contingencyNames.push(mediPackage.unvalidatedContingencyNames[unvalidatedContingencyIndex]);
    mediPackage.contingencyDescriptions.push(mediPackage.unvalidatedContingencyDescriptions[unvalidatedContingencyIndex]);
    mediPackage.contingencyCosts.push(mediPackage.unvalidatedContingencyCosts[unvalidatedContingencyIndex]);
    mediPackage.contingencyTimes.push(mediPackage.unvalidatedContingencyTimes[unvalidatedContingencyIndex]);

    mediPackage.totalCost += mediPackage.contingencyCosts[unvalidatedContingencyIndex];

    mediPackage.unvalidatedContingencyNames.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyCosts.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyDescriptions.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyTimes.splice(unvalidatedContingencyIndex, 1);

    await packageRegistry.update(mediPackage);
    await boughtPackageRegistry.update(boughtPackage);
}

/**
 * @param {medichain.network.RejectContingency} tx
 * @transaction
 */
async function RejectContingeny(tx) {
    const unvalidatedContingencyName = tx.contingencyName;

    const boughtPackageId = tx.boughtPackageId;
    const boughtPackageRegistry = await getAssetRegistry('medichain.network.BoughtPackage');
    const boughtPackage = await boughtPackageRegistry.get(boughtPackageId);

    const packageId = boughtPackage.packageId;
    const packageRegistry = await getAssetRegistry('medichain.network.Package');
    const mediPackage = await packageRegistry.get(packageId);

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getAssetRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const unvalidatedContingencyNames = mediPackage.unvalidatedContingencyNames;
    const unvalidatedContingencyIndex = unvalidatedContingencyNames.indexOf(unvalidatedContingencyName);
    const unvalidatedContingencyCost = mediPackage.unvalidatedContingencyCosts[unvalidatedContingencyIndex];

    mediPackage.unvalidatedContingencyNames.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyCosts.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyDescriptions.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyTimes.splice(unvalidatedContingencyIndex, 1);

    provider.wallet -= unvalidatedContingencyCost;
    provider.wallet -= CONTINGENCY_REJECTION_PENALTY;
    boughtPackage += CONTINGENCY_REJECTION_PENALTY;
    boughtPackage.holdAmount += unvalidatedContingencyCost;

    await packageRegistry.update(mediPackage);
    await boughtPackageRegistry.update(boughtPackage);
    await providerRegistry.update(provider);
}

/**
 * @param {medichain.network.VerifyContingency} tx
 * @transaction
 */
async function VerifyContingency(tx) {
    const boughtPackageId = tx.boughtPackageId;
    const boughtPackageRegistry = await getAssetRegistry('medichain.network.BoughtPackage');
    const boughtPackage = await boughtPackageRegistry.get(boughtPackageId);

    const packageId = boughtPackage.packageId;
    const packageRegistry = await getAssetRegistry('medichain.network.Package');
    const mediPackage = await packageRegistry.get(packageId);

    const unverifiedContingencyName = boughtPackage.unverifiedContingencyName;
    const unverifiedContingencyIndex = mediPackage.unvalidatedContingencyNames.indexOf(unverifiedContingencyName);
    const unverifiedContingencyCost = mediPackage.unvalidatedContingencyCosts[unverifiedContingencyIndex];
    boughtPackage.unverifiedContingencyName = "-1";

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getAssetRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    boughtPackage.contingencyFund -= unverifiedContingencyCost;
    provider.wallet += unverifiedContingencyCost;

    await boughtPackageRegistry.update(boughtPackage);
    await providerRegistry.update(providerId);
}