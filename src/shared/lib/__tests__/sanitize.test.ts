import { escapeHtml } from '../sanitize';

describe('escapeHtml', () => {
	it('escapes unsafe html characters', () => {
		const input = `<script>alert("x")</script> & 'quoted'`;
		const output = escapeHtml(input);

		expect(output).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;quoted&#39;');
	});

	it('returns same string when no escapable chars', () => {
		expect(escapeHtml('safe text 123')).toBe('safe text 123');
	});
});
