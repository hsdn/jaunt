/* eslint-disable no-param-reassign, comma-dangle */
"use strict";

const DefaultSettings = {
	"enable": true,
	"debug": false,
	"range": 50,
	"angle": 0.261799,
	"distance": 170,
	"direction": 1,
	"cooldown": 3000,
	"skill": 60401301 // 60401301 - обычное приветствие, 61905100 - приветствие рыбака
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) return { ...DefaultSettings, ...settings };
	else if (from_ver === null) return DefaultSettings;
	else {
		from_ver = Number(from_ver);
		to_ver = Number(to_ver);

		if (from_ver + 1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 1, settings);
			return MigrateSettings(from_ver + 1, to_ver, settings);
		}

		const oldsettings = settings;

		switch (to_ver) {
			default:
				settings = Object.assign(DefaultSettings, {});

				for (const option in oldsettings) {
					if (settings[option] !== undefined) {
						settings[option] = oldsettings[option];
					}
				}
		}

		return settings;
	}
};