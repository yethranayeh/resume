import "i18next";

import content from "./tr/content.json";
import { I18nResource, Namespace } from "./config";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: Namespace;
		resources: I18nResource;
	}
}
