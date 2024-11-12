import React from 'react'
import UploadForm from '../cloudinaryComponents/uploadFilesCloudinary'
import ImageGallery from '../cloudinaryComponents/displayUlbumImages'
import { Separator } from '../ui/separator'

export const GalleryCloudinary = () => {
  return (
    <div className="psektion respons space-y-10 bg-slate-100 ">
        <UploadForm/>
        <Separator/>
        <ImageGallery/>
    </div>
  )
}