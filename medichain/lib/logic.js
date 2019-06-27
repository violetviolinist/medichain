/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

    const stages = mediPackage.fundamentalProcedureNames;
    const stageName = tx.stageName;
    const stageIndex = stages.indexOf(stageName);

    const newProviderStageStatus = boughtPackage.providerStageStatus;
    newProviderStageStatus[stageIndex] = true;

    boughtPackage.providerStageStatus = newProviderStageStatus;

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

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getParticipantRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const stageName = tx.stageName;

    const stages = mediPackage.fundamentalProcedureNames;
    const stagesCost = mediPackage.fundamentalProcedureCosts;
    const stageIndex = stages.indexOf(stageName);
    const newPatientStageStatus = boughtPackage.patientStageStatus;

    newPatientStageStatus[stageIndex] = true;
    
    const stageCost = stagesCost[stageIndex];
    const currentHoldAmount = boughtPackage.holdAmount;
    const newHoldAmount = currentHoldAmount - stageCost;

    boughtPackage.holdAmount = newHoldAmount;
    boughtPackage.patientStageStatus = newPatientStageStatus;

    const providerWallet = provider.wallet;
    const newProviderWallet = providerWallet + stageCost;

    provider.wallet = newProviderWallet;

    await boughtPackageRegistry.update(boughtPackage);
    await providerRegistry.update(provider);
}

/**
 * @param {medichain.network.CompleteContingency} tx
 * @transaction
 */
async function CompleteContingency(tx) {
    const boughtPackageId = tx.boughtPackageId;
    const boughtPackageRegistry = await getAssetRegistry('medichain.network.BoughtPackage');
    const boughtPackage = await boughtPackageRegistry.get(boughtPackageId);

    const packageId = boughtPackage.packageId;
    const packageRegistry = await getAssetRegistry('medichain.network.Package');
    const mediPackage = await packageRegistry.get(packageId);

    const contingencyNames = mediPackage.contingencyNames;
    const contingencyName = tx.contingencyName;
    const contingencyIndex = contingencyNames.indexOf(contingencyName);

    const newProviderContingencyStatus = boughtPackage.providerContingencyStatus;
    newProviderContingencyStatus[contingencyIndex] = true;

    boughtPackage.providerContingencyStatus = newProviderContingencyStatus;

    await boughtPackageRegistry.update(boughtPackage);
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

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getParticipantRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    let contingencyCost = 0;
    const contingencyName = tx.contingencyName;
    if(mediPackage.contingencyNames.includes(contingencyName)){
        const contingencyIndex = mediPackage.contingencyNames.indexOf(contingencyName);
        contingencyCost = mediPackage.contingencyCosts[contingencyIndex];
        boughtPackage.patientContingencyStatus[contingencyIndex] = true;
    }else{
        const contingencyIndex = mediPackage.unvalidatedContingencyNames.indexOf(contingencyName);
        contingencyCost = mediPackage.unvalidatedContingencyCosts[contingencyIndex];
        boughtPackage.patientUnvalidatedContingencyStatus[contingencyIndex] = true;
    }

    boughtPackage.contingencyFund -= contingencyCost;
    provider.wallet += contingencyCost;

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
    const providerRegistry = await getParticipantRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const newContingencyName = tx.contingencyName;
    const newContingencyCost = tx.contingencyCost;
    const newContingencyDescription = tx.contingencyDescription;
    const newContingencyTime = tx.contingencyTime;

    mediPackage.unvalidatedContingencyNames.push(newContingencyName);
    mediPackage.unvalidatedContingencyDescriptions.push(newContingencyDescription);
    mediPackage.unvalidatedContingencyCosts.push(newContingencyCost);
    mediPackage.unvalidatedContingencyTimes.push(newContingencyTime);

    boughtPackage.patientUnvalidatedContingencyStatus.push(false);
    boughtPackage.providerUnvalidatedContingencyStatus.push(true);

    boughtPackage.unverifiedContingencyName = newContingencyName;

    ++provider.contingenciesProposed;

    await packageRegistry.update(mediPackage);
    await boughtPackageRegistry.update(boughtPackage);
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

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getParticipantRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const unvalidatedContingencyNames = mediPackage.unvalidatedContingencyNames;
    const unvalidatedContingencyIndex = unvalidatedContingencyNames.indexOf(unvalidatedContingencyName);

    mediPackage.contingencyNames.push(mediPackage.unvalidatedContingencyNames[unvalidatedContingencyIndex]);
    mediPackage.contingencyDescriptions.push(mediPackage.unvalidatedContingencyDescriptions[unvalidatedContingencyIndex]);
    mediPackage.contingencyCosts.push(mediPackage.unvalidatedContingencyCosts[unvalidatedContingencyIndex]);
    mediPackage.contingencyTimes.push(mediPackage.unvalidatedContingencyTimes[unvalidatedContingencyIndex]);

    mediPackage.unvalidatedContingencyNames.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyCosts.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyDescriptions.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyTimes.splice(unvalidatedContingencyIndex, 1);

    boughtPackage.patientContingencyStatus.push(boughtPackage.patientUnvalidatedContingencyStatus[unvalidatedContingencyIndex]);
    boughtPackage.providerContingencyStatus.push(boughtPackage.providerContingencyStatus[unvalidatedContingencyIndex]);

    boughtPackage.patientUnvalidatedContingencyStatus.splice(unvalidatedContingencyIndex, 1);
    boughtPackage.providerUnvalidatedContingencyStatus.splice(unvalidatedContingencyIndex, 1);

    mediPackage.totalCost += mediPackage.contingencyCosts[unvalidatedContingencyIndex];

    ++provider.contingenciesValidated;

    await packageRegistry.update(mediPackage);
    await boughtPackageRegistry.update(boughtPackage);
    await providerRegistry.update(provider);
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
    const providerRegistry = await getParticipantRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const unvalidatedContingencyNames = mediPackage.unvalidatedContingencyNames;
    const unvalidatedContingencyIndex = unvalidatedContingencyNames.indexOf(unvalidatedContingencyName);
    const unvalidatedContingencyCost = mediPackage.unvalidatedContingencyCosts[unvalidatedContingencyIndex];

    mediPackage.unvalidatedContingencyNames.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyCosts.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyDescriptions.splice(unvalidatedContingencyIndex, 1);
    mediPackage.unvalidatedContingencyTimes.splice(unvalidatedContingencyIndex, 1);

    boughtPackage.patientUnvalidatedContingencyStatus.splice(unvalidatedContingencyIndex, 1);
    boughtPackage.providerUnvalidatedContingencyStatus.splice(unvalidatedContingencyIndex, 1);

    provider.wallet -= unvalidatedContingencyCost;
    provider.wallet -= CONTINGENCY_REJECTION_PENALTY;
    boughtPackage.holdAmount += CONTINGENCY_REJECTION_PENALTY;
    boughtPackage.holdAmount += unvalidatedContingencyCost;

    await packageRegistry.update(mediPackage);
    await boughtPackageRegistry.update(boughtPackage);
    await providerRegistry.update(provider);
}

/**
 * Sample transaction
 * @param {medichain.network.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('medichain.network.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('medichain.network', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
