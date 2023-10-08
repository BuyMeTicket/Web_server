import multer from 'multer'

//參考網址
//https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E4%BD%BF%E7%94%A8-multer-%E5%AF%A6%E4%BD%9C%E5%A4%A7%E9%A0%AD%E8%B2%BC%E4%B8%8A%E5%82%B3-ee5bf1683113

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    // 限制上傳檔案的大小為 100MB
    fileSize: 1024*1024*100,
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG|pdf|PDF)$/)) {
      req.fileValidationError = '檔案格式錯誤'
      return cb(new Error('檔案格式錯誤'), false)
    }
    cb(null, true)
  },
})

/**
 * file preprocess by multer
 * @param  {String||Array} filename filename in multer
 * @return {List}      callback functions to put in router
 */
const fileProcess = (filename) => {
  let doUpload
  if (typeof filename === 'string') {
    if (filename.slice(-2) === '[]') doUpload = upload.array(filename)
    else doUpload = upload.single(filename)
  } else {
    doUpload = upload.fields(filename)
  }
  return (req, res, next) => {
    doUpload(req, res, (err) => {
      if (req.fileValidationError) {
        console.log('fileValidationError', req.fileValidationError)
        return res.status(400).send(req.fileValidationError)
      }
      //throw new ErrorHandler(400,req.fileValidationError)
      else if (err instanceof multer.MulterError) {
        console.log('multer error', err)
        return res.status(400).send(err.message)
      } else if (err) return res.status(400).send('檔案讀取發生錯誤')
      console.log('fileProcess success')
      next()
    })
  }
}
export default fileProcess