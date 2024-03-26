const ScoreEngineUtils = require('../../shared/ScoreEngineUtils.js');

describe('maximums', () => {
  it('should return the maximum element in the array', () => {
    const input = [
      { poid: 10 },
      { poid: 20 },
      { poid: 15 },
      { poid: 20 },
    ];

    const result = ScoreEngineUtils.maximums(input, (x) => x.poid);

    expect(result).toEqual([{ poid: 20 }, { poid: 20 }]);
  });

});

describe('secondCarre', () => {
  it('should return the identifier of the player with the strongest four of a kind', () => {
    const input = [
      { hand: [{ number: 2 }, { number: 2 }, { number: 2 }, { number: 2 }, { number: 3 }], id: 'player1' },
      { hand: [{ number: 3 }, { number: 3 }, { number: 3 }, { number: 3 }, { number: 4 }], id: 'player2' }
    ];

    const result = ScoreEngineUtils.secondCarre(input);

    expect(result).toEqual(['player2']);
  });

});

describe('secondFull', ()=> {
it('should return the indentifier of the player with the strongest full', () => {
  const input = [
    { hand: [{ number: 7 }, { number: 7 }, { number: 7 }, { number: 2 }, { number: 2 }], id: 'player1' },
    { hand: [{ number: 14 }, { number: 14 }, { number: 14 }, { number: 3 }, { number: 3 }], id: 'player2' }
  ];


  const result = ScoreEngineUtils.secondFull(input);

  expect(result).toEqual(['player2']);

})

});


describe('secondSuite', ()=> {
  it('should return the indentifier of the player with the strongest suite', () => {
    const input = [
      { hand: [{ number: 14 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }], id: 'player1' },
      { hand: [{ number: 5 }, { number: 6 }, { number: 7 }, { number: 8 }, { number: 9 }], id: 'player2' }
    ];
  
  
    const result = ScoreEngineUtils.secondSuite(input);
  
    expect(result).toEqual(['player2']);
  
  })
  
  });
  


  describe('secondBrelan', ()=> {
    it('should return the indentifier of the player with the strongest Brelan', () => {
      const input = [
        { hand: [{ number: 7 }, { number: 7 }, { number: 7 }, { number: 4 }, { number:  2}], id: 'player1' },
        { hand: [{ number: 14 }, { number: 14 }, { number: 14 }, { number: 12 }, { number: 10 }], id: 'player2' }
      ];
    
    
      const result = ScoreEngineUtils.secondBrelan(input);
    
      expect(result).toEqual(['player2']);
    
    })
    
    });
    

    describe('secondDoublePaire', ()=> {
      it('should return the indentifier of the player with the strongest doublePaire', () => {
        const input = [
          { hand: [{ number: 7 }, { number: 7 }, { number: 6 }, { number: 6 }, { number: 2 }], id: 'player1' },
          { hand: [{ number: 7 }, { number: 7 }, { number: 14 }, { number: 14 }, { number: 3 }], id: 'player2' }
        ];
      
      
        const result = ScoreEngineUtils.secondDoublePaire(input);
      
        expect(result).toEqual(['player2']);
      
      })
      
      });
      

    describe('secondPaire', ()=> {
      it('should return the indentifier of the player with the strongest paire', () => {
        const input = [
          { hand: [{ number: 7 }, { number: 7 }, { number: 13 }, { number: 10 }, { number: 3 }], id: 'player1' },
          { hand: [{ number: 7 }, { number: 7 }, { number: 14 }, { number: 11 }, { number: 3 }], id: 'player2' }
        ];
      
      
        const result = ScoreEngineUtils.secondPaire(input);
      
        expect(result).toEqual(['player2']);
      
      })
      
      });


      describe('secondCarteHaute', ()=> {
        it('should return the indentifier of the player with the strongest CarteHaute', () => {
          const input = [
            { hand: [{ number: 14 }, { number: 12 }, { number: 6 }, { number: 4 }, { number:  2}], id: 'player1' },
            { hand: [{ number: 14 }, { number:  10}, { number: 6 }, { number: 4 }, { number: 2 }], id: 'player2' }
          ];
        
        
          const result = ScoreEngineUtils.secondCarteHaute(input);
        
          expect(result).toEqual(['player1']);
        
        })
        
        });

