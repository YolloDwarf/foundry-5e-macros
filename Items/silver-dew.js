async function silverDewMacro(args) {
    try {
        const effect = duplicate(args[0].actor.effects.find((e) => e.label === "Silver Dew"));
        let change = effect.changes.find((c) => c.key.includes("OverTime"));
        const dc = +change.value.match(/(?<=saveDC\=)\d+/);
        console.log(args[0].workflow.saveResults[0].total);
        console.log(dc);
        if (args[0].workflow.saveResults[0].total < dc) {
            await args[0].actor.deleteEmbeddedDocuments("ActiveEffect", [effect._id]);
            const exhaustion = args[0].actor.effects.find((e) => e.label.includes("Exhaustion"));
            if (!exhaustion) {
                await game.dfreds.effectInterface.addEffect({ effectName: "Exhaustion 1", uuid: args[0].actorUuid });
                return;
            }
            const exhLevel = +exhaustion.label.match(/\d/);
            await game.dfreds.effectInterface.addEffect({ effectName: `Exhaustion ${exhLevel + 1}`, uuid: args[0].actorUuid });
        } else {
            const newDC = (dc + 5).toString();
            change.value = change.value.replace(/(?<=saveDC\=)\d+/, newDC);
            await args[0].actor.updateEmbeddedDocuments("ActiveEffect", [effect]);
        }
    } catch (err) {
        console.log(err);
    }
}
