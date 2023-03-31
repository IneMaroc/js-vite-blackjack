
  
  /**
   * this function returns a new deck
   * @param {Array<string>} tiposDeCarta Example: ['C', 'D', 'H', 'S']
   * @param {Array<string>} tiposEspeciales Example: ['A', 'J', 'Q', 'K']
   * @returns {Array<string>} It returns a new deck
   */

  export const crearDeck = (tiposDeCarta, tiposEspeciales) => {

   if ( !tiposDeCarta || tiposDeCarta.length === 0 ) throw new Error ('TiposDeCarta es obligatorio como un arreglo de string');

   if ( !tiposEspeciales || tiposEspeciales.length === 0 ) throw new Error ('TiposDeCarta es obligatorio como un arreglo de string');

   let deck = [];

   for(let i = 2; i<=10; i++){
      for(let tipo of tiposDeCarta) {
         deck.push(i + tipo);
      }
   }

   for(let tipo of tiposDeCarta){
      for(let esp of tiposEspeciales) {
         deck.push(esp + tipo);
      }
   }

   return deck
};

