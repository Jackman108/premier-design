type TaintApi = {
	experimental_taintUniqueValue?: (label: string, value: unknown) => void;
	taintObjectReference?: (label: string, value: object) => void;
};

const getReactTaintApi = (): TaintApi | null => {
	try {
		const reactModule = require('react') as TaintApi;
		return reactModule;
	} catch {
		return null;
	}
};

export const taintSecretValue = (label: string, value: string): string => {
	const taintApi = getReactTaintApi();
	taintApi?.experimental_taintUniqueValue?.(label, value);
	return value;
};

export const taintSecretObject = <T extends object>(label: string, value: T): T => {
	const taintApi = getReactTaintApi();
	taintApi?.taintObjectReference?.(label, value);
	return value;
};
