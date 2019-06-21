'use strict';

/**
 * @param {medichain.network.CompleteStage} tx
 * @transaction
 */
async function completeStage(tx) {
    const boughtPackageId = tx.boughtPackageId;
    const boughtPackageRegistry = await getAssetRegistry('medichain.network.BoughtPackage');
    const boughtPackage = await boughtPackageRegistry.get(boughtPackageId);

    const currentStage = boughtPackage.currentStage;
    const stages = boughtPackage.stages;
    const stagesCost = boughtPackage.stagesCost;
    const stagesLength = boughtPackage.length;

    const currentStageIndex = stages.indexOf(currentStage);
    const newCurrentStage = stages[currentStageIndex + 1];
    
    boughtPackage.currentStage = newCurrentStage;

    const providerIdentifier = "medichain.network." + boughtPackage.providerType;
    const providerId = boughtPackage.providerId;
    const providerRegistry = await getAssetRegistry(providerRegistry);
    const provider = await providerRegistry.get(providerId);

    const currentStageCost = stagesCost[currentStageIndex];
    const currentHoldAmount = boughtPackage.holdAmount;
    const newHoldAmount = currentHoldAmount - currentStageCost;

    boughtPackage.holdAmount = newHoldAmount;

    const providerWallet = provider.wallet;
    const newProviderWallet = providerWallet + currentStageCost;

    provider.wallet = newProviderWallet;

    await boughtPackageRegistry.update(boughtPackage);
    await providerRegistry.update(provider);
}

// /**
//  * @param {org.medi.medichain.SampleTransaction} sampleTransaction
//  * @transaction
//  */
// async function sampleTransaction(tx) {
//     const oldValue = tx.asset.value;

//     tx.asset.value = tx.newValue;

//     const assetRegistry = await getAssetRegistry('org.medi.medichain.SampleAsset');
//     await assetRegistry.update(tx.asset);

//     let event = getFactory().newEvent('org.medi.medichain', 'SampleEvent');
//     event.asset = tx.asset;
//     event.oldValue = oldValue;
//     event.newValue = tx.newValue;
//     emit(event);
// }