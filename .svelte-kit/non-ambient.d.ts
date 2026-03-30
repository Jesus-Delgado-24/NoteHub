
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/login" | "/api/logout" | "/api/note" | "/api/profile" | "/api/register" | "/login" | "/profile" | "/register";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/login": Record<string, never>;
			"/api/logout": Record<string, never>;
			"/api/note": Record<string, never>;
			"/api/profile": Record<string, never>;
			"/api/register": Record<string, never>;
			"/login": Record<string, never>;
			"/profile": Record<string, never>;
			"/register": Record<string, never>
		};
		Pathname(): "/" | "/api/login" | "/api/logout" | "/api/note" | "/api/profile" | "/api/register" | "/login" | "/profile" | "/register";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/Img-1.png" | "/images/Img-2.png" | "/images/Img-3.png" | "/robots.txt" | string & {};
	}
}