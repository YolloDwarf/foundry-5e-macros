async function regenMacro(args) {
    try {
        if (args[0]?.macroPass === "postActiveEffects") {
            const actor = args[0].actor;
            console.log(actor);
            const mustEnd = actor.system.attributes.hp.value === 0;
            await actor.update({ "system.attributes.hp.value": actor.system.attributes.hp.value + 5 });
        }
    } catch (err) {
        console.log(err);
    }
}
