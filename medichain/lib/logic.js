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
    const package = await packageRegistry.get(packageId);

    const currentStage = boughtPackage.currentStage;
    const stages = package.fundamentalProcedureNames;

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
    const package = await packageRegistry.get(packageId);

    const stages = package.fundamentalProcedureNames;
    const stagesCost = package.fundamentalProcedureCosts;
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
    const package = await packageRegistry.get(packageId);

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getAssetRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const newContingencyName = tx.contingencyName;
    const newContingencyCost = tx.contingencyCost;
    const newContingencyDescription = tx.contingencyDescription;
    const newContingencyTime = tx.ContingencyTime;

    // const unvalidatedContingencyNames = package.unvalidatedContingencyNames;
    // const unvalidatedContingencyDescriptions = package.unvalidatedContingencyDescriptions;
    // const unvalidatedContingencyCosts = package.unvalidatedContingencyCosts;
    // const unvalidatedContingencyTimes = package.unvalidatedContingencyTimes;

    package.unvalidatedContingencyNames.push(newContingencyName);
    package.unvalidatedContingencyDescriptions.push(newContingencyDescription);
    package.unvalidatedContingencyCosts.push(newContingencyCost);
    package.unvalidatedContingencyTimes.push(newContingencyTime);

    boughtPackage.unerifiedContingencyName = newContingencyName;

    ++provider.contingenciesProposed;

    await packageRegistry.update(package);
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
    const package = await packageRegistry.get(packageId);

    const unvalidatedContingencyNames = package.unvalidatedContingencyNames;
    const unvalidatedContingencyIndex = unvalidatedContingencyNames.indexOf(unvalidatedContingencyName);

    package.contingencyNames.push(package.unvalidatedContingencyNames[unvalidatedContingencyIndex]);
    package.contingencyDescriptions.push(package.unvalidatedContingencyDescriptions[unvalidatedContingencyIndex]);
    package.contingencyCosts.push(package.unvalidatedContingencyCosts[unvalidatedContingencyIndex]);
    package.contingencyTimes.push(package.unvalidatedContingencyTimes[unvalidatedContingencyIndex]);

    package.totalCost += package.contingencyCosts[unvalidatedContingencyIndex];

    package.unvalidatedContingencyNames.splice(unvalidatedContingencyIndex, 1);
    package.unvalidatedContingencyCosts.splice(unvalidatedContingencyIndex, 1);
    package.unvalidatedContingencyDescriptions.splice(unvalidatedContingencyIndex, 1);
    package.unvalidatedContingencyTimes.splice(unvalidatedContingencyIndex, 1);

    await packageRegistry.update(package);
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
    const package = await packageRegistry.get(packageId);

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getAssetRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const unvalidatedContingencyNames = package.unvalidatedContingencyNames;
    const unvalidatedContingencyIndex = unvalidatedContingencyNames.indexOf(unvalidatedContingencyName);
    const unvalidatedContingencyCost = package.unvalidatedContingencyCosts[unvalidatedContingencyIndex];

    package.unvalidatedContingencyNames.splice(unvalidatedContingencyIndex, 1);
    package.unvalidatedContingencyCosts.splice(unvalidatedContingencyIndex, 1);
    package.unvalidatedContingencyDescriptions.splice(unvalidatedContingencyIndex, 1);
    package.unvalidatedContingencyTimes.splice(unvalidatedContingencyIndex, 1);

    provider.wallet -= unvalidatedContingencyCost;
    provider.wallet -= CONTINGENCY_REJECTION_PENALTY;
    boughtPackage += CONTINGENCY_REJECTION_PENALTY;
    boughtPackage.holdAmount += unvalidatedContingencyCost;

    await packageRegistry.update(package);
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
    const package = await packageRegistry.get(packageId);

    const unverifiedContingencyName = boughtPackage.unverifiedContingencyName;
    const unverifiedContingencyIndex = package.unvalidatedContingencyNames.indexOf(unverifiedContingencyName);
    const unverifiedContingencyCost = package.unvalidatedContingencyCosts[unverifiedContingencyIndex];
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