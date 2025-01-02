function HexGenerator(ignoreHashtag:boolean=false): string {
	let r: number,
		g: number,
		b: number;
	do {
		r = Math.floor( Math.random() * 256 );
		g = Math.floor( Math.random() * 256 );
		b = Math.floor( Math.random() * 256 );
	} while ( r > 220 && g > 220 && b > 220 ); // Avoid colors too close to white

	// Ensure the color is bright enough
	while ( r + g + b < 400 ) { // Brightness threshold
		r = Math.min( r + Math.floor( Math.random() * 50 ), 255 );
		g = Math.min( g + Math.floor( Math.random() * 50 ), 255 );
		b = Math.min( b + Math.floor( Math.random() * 50 ), 255 );
	}

	return `${ignoreHashtag ? '' : '#'}${ ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString( 16 ).slice( 1 ) }`;
}

export default HexGenerator;
