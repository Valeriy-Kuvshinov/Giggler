import { useState, useEffect } from 'react'
import { uploadService } from '../services/upload.service.js'

export function ImgUploader({ index, defaultImgUrl, onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: defaultImgUrl || null,
    height: 600,
    width: 600,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url, index)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Replace Image?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  useEffect(() => {
    setImgData((prevData) => ({
      ...prevData,
      imgUrl: defaultImgUrl || null,
    }))
  }, [defaultImgUrl])

  const inputId = `imgUpload-${index}`

  return (
    <div className="upload-preview flex column">
      <div className="file-upload-container">
        <label htmlFor={inputId} className="custom-file-upload flex column">
          {getUploadLabel()}
          {imgData.imgUrl && <img src={imgData.imgUrl} />}
        </label>
        <input
          type="file"
          onChange={uploadImg}
          accept="image/*"
          id={inputId}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}