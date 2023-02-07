/**
    * @name PreventAudioSwitch
    * @source 
    * @description Prevents Discord from switching to a new added audio source.
    * @updateUrl 
    * @website 
    * @version 0.0.2
    */

const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
    info: {
        name: "PreventAudioSwitch",
        authors: [
            {
                name: "aaskjer"
            }
        ],
        version: "0.0.6",
        description: "Prevents Discord from switching to a new added audio source.",
        github_raw: "",
    },
    changelog: [
        {
            title: "Fixes",
            type: "fixed",
            items: [
                "Initial release."
            ]
        }
    ],
    defaultConfig: []
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for AQWERT'sPluginBuilder is missing. Please click Download Now to install it.`, {
            confirmText: "Download",
            cancelText: "Cancel",
            onConfirm: () => {
                request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                    if (error)
                        return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");

                    fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                });
            }
        });
    }

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
const { WebpackModules } = require("ZeresPluginLibrary");
const AudioDevice = WebpackModules.getByProps("getAudioSources");
const AudioSourceChooser = WebpackModules.getByProps("chooseAudioSource");

AudioDevice.chooseAudioSource = function(source) {
  const currentSource = AudioSourceChooser.getCurrentAudioSource();
  if (currentSource && currentSource.id !== source.id) {
    return false;
  }
  return AudioDevice.__original.chooseAudioSource(source);
};

    return plugin;
})(global.ZeresPluginLibrary.buildPlugin(config));
