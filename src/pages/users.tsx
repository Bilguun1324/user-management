import { useState } from "react"
import { UsersDashboard, AddUserModal, CustomModal } from "../components"
import { Box, Button } from "@material-ui/core"

export const Users = () => {
    const [open, setOpen] = useState(false)

    return (
        <Box>
            <Button type='submit' variant='outlined' onClick={() => setOpen(true)}>ХЭРЭГЛЭГЧ НЭМЭХ</Button>
            <UsersDashboard />
            <CustomModal open={open} setOpen={setOpen}>
                <AddUserModal setOpen={setOpen} />
            </CustomModal>
        </Box>
    )
}