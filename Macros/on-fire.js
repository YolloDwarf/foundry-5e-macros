async function onFire(args) {
    try {
        let target = await fromUuid(args[0].hitTargetUuids[0] ?? "");
        if (args[0].workflow.saveResults[0].total < args[0].item.system.save.dc) {
            const roll = await new Roll("1d6").evaluate({ async: true });
            new MidiQOL.DamageOnlyWorkflow(args[0].actor, args[0].token, roll.total, "fire", target ? [target] : [], roll, {
                flavor: "On Fire",
                itemCardId: args[0].itemCardId
            });
        } else if (args[0].workflow.saveResults[0].total >= args[0].item.system.save.dc && target) {
            await game.dfreds.effectInterface.removeEffect({ effectName: "On Fire", uuid: target.actor.uuid });
        }
    } catch (err) {
        console.log(err);
    }
}
