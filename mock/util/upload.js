// const path = require('path');
// const fs = require('fs');
// const Busboy = require('busboy');
// /**
//  * 获取到文件的后缀名
//  * @params { string } fileName 文件名称
//  * @return { string }          ./xxx
//  */
// function getSuffixName(fileName) {
//   return path.extname(fileName);
// }

// /**
// * 创建文件路径
// * @params { string } dirname 决定路径
// * @return { bool }           创建的结果
// */
// function mkdirSync(dirname) {
//   if (fs.existsSync(dirname)) {
//     return true;
//   } else {
//     if (mkdirSync(path.dirname(dirname))) {
//       fs.mkdirSync(dirname);
//       return true
//     }
//   }
// }

// /**
//  * 上传文件到指定的路径
//  * @params { object } ctx koa上下文
//  * @params { string } storagePath 上传的路径
//  * @return { promise }
//  */
// function uploadFile(ctx, storagePath) {
//   const req = ctx.req;
//   const res = ctx.res;
//   const busboy = new Busboy({headers: req.headers});
//   const result = {
//     code: 1111,
//     msg: 'ERROR',
//     resultDate: null,
//   };
//   const mkdirResult = mkdirSync(storagePath);
//   return new Promise((reject, resolve) => {
//     *
//      * 文件开始解析
//      * @params { string }   fieldname 文件的字段名称
//      * @params { object }   file      文件流
//      * @params { string }   filename  文件名
//      * @params { encoding } string    编码方式
//      * @params { string }   string    mimetype类型

//     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//       console.log('文件开始上传...');
//       const fileName = Math.random().toString().slice(2) + getSuffixName(filename);
//       file.pipe(fs.createWriteStream(fileName));
//       file.on('end', function() {
//         console.log('文件上传完成！！！');
//         result.code = 0;
//         result.msg = 'SUCCESS';
//         result.resultDate = '文件上传完成！！！';
//         resolve(result);
//       });
//     });

//     busboy.on('finish', function() {
//       console.log('文件上传结束...');
//       resolve(result);
//     });

//     busboy.on('error', function(err) {
//       console.log('文件上传出错...');
//       reject(result);
//     });

//     req.pipe(busboy);
//   });
// }

// module.exports = uploadFile;

const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

function getSuffixName(filename) {
  return path.extname(filename);
};

function getPrevPath(pathName) {
  const prevArr = path.join(pathName).split(/\\/);
  prevArr.pop();
  const prevPath = prevArr.join('/');
  console.log(path.join(prevPath));
  return path.join(prevPath);
};

function mkDirSync(pathName) {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    const prevpath = getPrevPath(pathName);
    if (fs.existsSync(prevpath)) {
      fs.mkdirSync(pathName);
      return true;
    } else {
      mkDirSync(prevpath);
    }
  }
};

function uploadFile(ctx, storagepath) {
  const res = ctx.res;
  const req = ctx.req;
  const busboy = new Busboy({ headers: req.headers });
  const mkDirSyncResult = mkDirSync(storagepath);
  const result = {
    code: 0,
    msg: 'SUCCESS',
    content: null,
  };
  return new Promise((resolve, reject) => {
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('文件开始上传...');
      const fileName = Math.random().toString().slice(2) + getSuffixName(filename);
      const savePath = path.join(storagepath, fileName);
      file.pipe(fs.createWriteStream(savePath));
      file.on('end', function() {
        console.log('文件上传结束！！！');
        result.content = {
          filename: fileName,
          url: `http://localhost:8080/images/${fileName}`,
        };
      });
    });
    busboy.on('finish', function() {
      console.log('文件上传完成！！！');
      resolve(result);
    });

    busboy.on('error', function(error) {
      console.log('文件上传出错了~~~');
      result.code = 1;
      result.msg = 'ERROR';
      reject(result);
    });
    req.pipe(busboy);
  });
};
module.exports = uploadFile;
