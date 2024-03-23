const roomController = require('./roomController')();

/**
 * Hydrate function form.
 * 
 * simplifies tests.
 */

const h_crea = ({id,rules,players},verbose=true) => roomController.createGame(id,rules,players,verbose);
const getFunctionsOfObject = (obj) => Object.getOwnPropertyNames(obj).filter(i => typeof obj[i] === "function");
const getVarsOfObject = (obj) => Object.getOwnPropertyNames(obj).filter(i => typeof obj[i] !== "function");

function compareRules(room, rules){
    setRoom = getVarsOfObject(room);
    setRules = getVarsOfObject(rules);
    setRules.forEach(i => {
        if(setRoom.indexOf(i) ==-1)
            return {status: 0, mes:"Missing args"};
        if(rules[i] != room[i]){
            return {status: 0, mes:"Args not equal"};
        }
    })
    return {
        status: 1,
        mes:"Identical rules"
    };
}

function testCreation(){
    args_crea = {
        id: "10a0",
        rules:{
            type:"dqskioz",
            set:"aqze",
            bid:{
                big:50,
                small:20
            },
        },
        players: []
    }
    // console.log("Arguments de création : ");
    // console.log(args_crea);

    // Object A
    gameA = h_crea(args_crea,false);
    if(gameA.players.toString() != args_crea.players.toString() || gameA.id != args_crea.id)
        return {success: false, mes: "Args wrongly set to room"}
    testRules =compareRules(gameA,args_crea);
    if(testRules.status == 0)
        return {success:false, mes:testRules.mes};
    
    // Object B
    gameB = h_crea(args_crea,false);
    if(gameB.players.toString() != args_crea.players.toString() || gameB.id != args_crea.id)
        return {success: false, mes: "Args wrongly set to room"+args_crea + " !==" + gameB};
    testRules =compareRules(gameB,args_crea);
    if(testRules.status == 0)
        return {success:false, mes:testRules.mes};
   

    // Object C
    args_crea.players = [1,2];
    gameC = h_crea(args_crea,false);
    if(gameC.players.toString() != args_crea.players.toString() || gameC.id != args_crea.id)
        return {success: false, mes: "Args wrongly set to room"}

    testRules =compareRules(gameC,args_crea);
    if(testRules.status == 0)
        return {success:false, mes:testRules.mes};

    return {
        success: true,
        mes: "All fine",
    }
}

function testPlaying(){
    args_crea = {
        id: "10a0",
        rules:{
            type:"dqskioz",
            set:"aqze",
            bid:{
                big:50,
                small:20
            },
        },
        players: [],
        verbose:false
    }
    gameA = h_crea(args_crea,false);
    args_crea.players = [0,1]
    gameB = h_crea(args_crea,false);
    let t = undefined;
    playersLookups = [0,1]

    failed = {
        success: false,
        mes: "Didn't detected players playing."
    };

    // gameA has to fail
    playersLookups.forEach(p => {
        if(gameA.isPlaying(p)){
            console.error("a players: ",gameA.players);
            console.error("Lookup : " + playersLookups);
            t = failed;
        }
    })
    if(t !== undefined) return t;

    // gameB has to succeed
    playersLookups.forEach(p => {
        if(!gameB.isPlaying(p)){
            console.error("B players:",gameB.players);
            console.error("Lookup : " + p);
            t = failed;
        }
    })
    if(t !== undefined) return t;

    failed = {
        success: false,
        mes: "Detected players not playing."
    };
    t = true;
    if(gameA.isPlaying(0) == true)
        return {...failed, mes:failed.mes+"A"};
    if(gameB.isPlaying(2) == true)
        return {...failed, mes:failed.mes+"B"};

    return{
        success: true,
        mes: "All fine"
    }
}

const tests = {
    crea_: testCreation,
    playing: testPlaying,
}


function successLog(data){
    console.log("Success : V");
    console.log('%c'+data, 'color:#33FF33;background:#003300;');
}
function failedLog(data){
    console.log("Failed : X");
    console.error(data);
}

lists = getFunctionsOfObject(tests);
console.log("Listes of tests function to call : " +lists );
lists.forEach((fun) => {
    console.log("------------\nfunction "+fun);
    val = tests[fun]();
    if(val.success){
        successLog(val.mes);
    }else
        failedLog(val.mes);
    console.log("------------\n");
});