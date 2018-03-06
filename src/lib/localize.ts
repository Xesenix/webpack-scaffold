import Gettext from 'node-gettext';

const startTime = Date.now();
export const i18n = new Gettext();
export const languages: string[] = process.env.LANGUAGES || ['en'];

languages.forEach((locale: string) => {
	try {
		i18n.addTranslations(locale, 'messages', require(`${process.env.LOCALES_DIR}/messages.${locale}.po`));
	} catch (err) {
		console.warn(`Missing locales: ${locale}`);
	}
});
i18n.setLocale(languages[0]);
console.log('Loading languages time:', Date.now() - startTime);

export const __ = i18n.gettext.bind(i18n);
