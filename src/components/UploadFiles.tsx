import {
  Box,
  Typography,
  FormHelperText,
  useTheme,
} from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDropzone } from 'react-dropzone'
import { FormikErrors, FormikTouched } from "formik"


interface Props {
  files: any[]
  errors: string | string[] | FormikErrors<any>[] | undefined
  touched: boolean | FormikTouched<any>[] | undefined
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}


const UploadFiles = ({ files, errors, touched, setFieldValue }: Props) => {
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg"]

    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => (
        Object.assign(file, {
          url: URL.createObjectURL(file)
        })
      ))
      setFieldValue("files", [...files, ...newFiles])
    }
  })

  function handleDeleteButton(photo: { url: string }) {
    const filterFiles = files.filter((file) => file.url !== photo.url)
    setFieldValue("files", filterFiles)
    console.log(filterFiles)
  }


  return (
    <>
      {
        errors && touched &&
        <FormHelperText sx={{ mb: "5px" }} error={Boolean(errors && touched)}>
          {errors as string}
        </FormHelperText>
      }
      <Box sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(100px, 1fr))",
          sm: "repeat(3, minmax(100px, 1fr))",
          md: "repeat(4, minmax(100px, 1fr))"
        },
        gap: "10px",
      }}>
        <Box {...getRootProps()} sx={{
          cursor: "pointer",
          border: "2px dashed",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          padding: "10px",
          height: "250px",
        }} color={errors && touched ? "#d32f2f" : "grey"} >
          <input id="files" name="files" {...getInputProps()} type="text" />
          <Typography variant="body1" color={errors && touched ? "error" : "grey"}>
            Clique para adicionar ou arraste a imagem até aqui.
          </Typography>
        </Box>

        {files.map((photo, index) => {
          return (
            <Box key={index} sx={{
              height: "250px",
              position: "relative",
              "&:hover": {
                "#delete-icon": {
                  display: "block"
                },
                ".overlay": {
                  bgcolor: "#0000009d"
                }
              },
              backgroundImage: `url(${photo.url})`,
              backgroundSize: "cover",
            }}
            >
              <Box sx={{
                height: "100%",
                width: "100%",
              }} className="overlay">
              </Box>
              {index === 0 &&
                <Box sx={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  padding: "5px",
                  bgcolor: theme.palette.primary.main,
                  borderRadius: "3px"
                }}
                >
                  <Typography className="principal" variant="body2">
                    Principal
                  </Typography>
                </Box>}
              <a onClick={() => handleDeleteButton(photo)}>
                <DeleteForeverIcon id="delete-icon" color="primary" sx={{
                  cursor: "pointer",
                  display: "none",
                  fontSize: "40px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                }} />
              </a>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default UploadFiles