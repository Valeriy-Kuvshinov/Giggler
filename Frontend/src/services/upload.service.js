export const uploadService = {
  uploadImg
}
async function uploadImg(ev) {
  const CLOUD_NAME = "digrqdbso"
  const UPLOAD_PRESET = "p014xlwt"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/home/Giggler/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}