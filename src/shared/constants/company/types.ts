/** Типы реквизитов оператора и связанных сущностей — PD-R-03. */

export type LegalRequisites = {
	readonly fullName: string;
	readonly shortName: string;
	readonly unp: string | null;
	readonly registrationAuthority: string | null;
	readonly registrationDate: string | null;
};

export type ContactPoint = {
	readonly tel: string;
	readonly display: string;
};

export type AddressDetails = {
	readonly full: string;
	readonly streetAddress: string;
	readonly addressLocality: string;
	readonly postalCode: string;
	readonly addressCountry: string;
};

export type WorkHoursSummary = {
	readonly summary: string;
	readonly slots: ReadonlyArray<{
		readonly daysOfWeek: ReadonlyArray<'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'>;
		readonly opens: string;
		readonly closes: string;
	}>;
};

export type BankDetails = {
	readonly bankName: string;
	readonly bic: string;
	readonly account: string;
} | null;
