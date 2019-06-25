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

    const currentStage = boughtPackage.currentStage;
    const stages = mediPackage.fundamentalProcedureNames;

    const currentStageIndex = stages.indexOf(currentStage);
    const newCurrentStage = stages[currentStageIndex + 1];
    
    boughtPackage.currentStage = newCurrentStage;
    boughtPackage.unverifiedStageName = currentStage;

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
    const unverifiedStageName = boughtPackage.unverifiedStageName;
    const unverifiedStageIndex = stages.indexOf(unverifiedStageName);

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getParticipantRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    const unverifiedStageCost = stagesCost[unverifiedStageIndex];
    const currentHoldAmount = boughtPackage.holdAmount;
    const newHoldAmount = currentHoldAmount - unverifiedStageCost;

    boughtPackage.holdAmount = newHoldAmount;
    boughtPackage.unverifiedStageName = "-1";

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

    mediPackage.totalCost += mediPackage.contingencyCosts[unvalidatedContingencyIndex];

    ++provider.contingenciesValidated;

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

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getParticipantRegistry(providerIdentifier);
    const provider = await providerRegistry.get(providerId);

    boughtPackage.unverifiedContingencyName = "-1";
    boughtPackage.contingencyFund -= unverifiedContingencyCost;

    provider.wallet += unverifiedContingencyCost;

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
