"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRouter = void 0;
//let sockets:any[]=[];
const connectRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let profileId = req.params.profileId;
    // let st=+new Date();
    console.info(`SSE : ${profileId}`);
    // const headers = {
    //     'Content-Type': 'text/event-stream', // To tell client, it is event stream
    //     'Connection': 'keep-alive', // To tell client, not to close connection
    // };
    // res.writeHead(200, headers);
    // res.write('data: Connection Established, We\'ll now start receiving messages from the server.\n\n')
    // let isProfilePresent=false;
    // RedisApp.socketArr.forEach((soc)=>{
    //     if(soc.profileId==profileId){
    //         isProfilePresent=true;
    //     }
    // });
    // if(!isProfilePresent){
    //     
    //     RedisApp.socketArr.push({res,profileId,st});
    // }else{
    //     
    // }
    return res.send({ status: "success" });
});
exports.connectRouter = connectRouter;
// setInterval(()=>{
//     if(RedisApp.socketArr?.length){
//         for(let i=0;i<RedisApp.socketArr.length;i++){
//             let soc=RedisApp.socketArr[i];
//             if(soc.st < ((+new Date())-2*60*1000)){
//                 soc.res.end("end");
//                 RedisApp.socketArr.splice(i, 1);
//             }
//         }
//         console.info('25:Total sockets',RedisApp.socketArr.length);
//         // if(sockets?.length){
//         //     sockets.forEach((soc)=>{
//         //         soc.res.write(`data: ${sockets?.length} | ${soc.profileId} Server Time ${new Date()}\n\n`);
//         //     })
//         // }
//     }
// },5*1000)
//# sourceMappingURL=connect.js.map