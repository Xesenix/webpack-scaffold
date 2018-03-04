import { __, i18n } from './localize';
describe('localize', () => {
	describe('i18n', () => {
		describe('setLocale', () => {
			it('should switch current locale', () => {
				const locale = 'xyz';
				i18n.setLocale(locale);
				expect(i18n.locale).toEqual(locale);
			});
		});
	});

	describe('__', () => {
		it('should translate provided keys', () => {
			i18n.addTranslations('pl', 'messages', {
				charset: 'utf-8',
					headers: {
						'language': 'pl_PL',
						'plural-forms': 'nplurals=3; plural=(n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);',
					},
					translations: {
						'': {
						abc: { msgid: 'abc', msgstr: ['xyz'] },
						ABC: { msgid: 'ABC', msgstr: ['QWERTY'] },
					},
				},
			});
			i18n.setLocale('pl');
			expect(__('abc')).toEqual('xyz');
			expect(__('ABC')).toEqual('QWERTY');
			expect(__('boom')).toEqual('boom');
		});
	});
});
