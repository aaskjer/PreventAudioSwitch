/**
    * @name PreventAudioSwitch
    * @source 
    * @description Prevents Discord from switching to a new added audio source.
    * @updateUrl 
    * @website 
    * @version 0.0.1
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

const { WebpackModules, Patcher } = require("powercord/webpack");
const AudioDevice = WebpackModules.getByProps("getAudioSources");
const AudioSourceChooser = WebpackModules.getByProps("chooseAudioSource");

Patcher.after(AudioDevice, "chooseAudioSource", (_, source) => {
  const currentSource = AudioSourceChooser.getCurrentAudioSource();
  if (currentSource && currentSource.id !== source.id) {
    return false;
  }
});