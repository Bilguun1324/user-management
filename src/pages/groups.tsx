import { useState } from "react"
import { GroupsDashboard, AddGroupModal, CustomModal } from "../components"
import { Box, Button } from "@material-ui/core"

export const Groups = () => {
    const [open, setOpen] = useState(false)

    return (
        <Box>
            <Button type='submit' variant='outlined' onClick={() => setOpen(true)}>ADD GROUP</Button>
            <GroupsDashboard />
            <CustomModal open={open} setOpen={setOpen}>
                <AddGroupModal setOpen={setOpen}/>
            </CustomModal>
        </Box>
    )
}