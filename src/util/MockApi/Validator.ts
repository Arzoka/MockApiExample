const Validator = {
	validate( data: Record<string, any>, rules: Record<string, ( data: any ) => boolean | string> ): void {
		for ( const [key, rule] of Object.entries( rules ) ) {
			const result = rule( data );
			if ( result !== true ) {
				this.handleError( result, key );
			}
		}
	},

	handleError( result: boolean | string, key: string ): void {
		const errorMessage: string = typeof result === 'string' ? `\nErrormessage: ${ result }` : '';
		throw new Error( `Validation failed for rule "${ key }".${ errorMessage }` );
	}
};

export default Validator;
