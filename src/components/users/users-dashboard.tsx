import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS, INVITE_USER_TO_GROUP, GET_GROUPS } from '../../graphql';
import { Button, TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CustomModal, DESCRIPTION, EMAIL, FIRST_NAME, LAST_NAME } from '../common';
import { useState } from 'react';

export const UsersDashboard = () => {
    const { data, loading } = useQuery(GET_USERS)
    const { data: grpData } = useQuery(GET_GROUPS)
    const [permission, setPermission] = useState('')
    const [group, setGroup] = useState({ name: '', id: '' })
    const [inviteUser] = useMutation(INVITE_USER_TO_GROUP)
    const [open, setOpen] = useState(false)
    const [uid, setUid] = useState(false)

    const renderModal = (id: any) => {
        setOpen(true)
        setUid(id)
    }

    const invite = () => {
        const values = {
            id: group.id,
            uid: uid,
            permission: permission,
        }
        console.log(values)
        inviteUser({ variables: values })
        setOpen(false)
    }

    const columns = [
        { field: 'firstName', headerName: FIRST_NAME, width: 150 },
        { field: 'lastName', headerName: LAST_NAME, width: 150 },
        { field: 'email', headerName: EMAIL, width: 170 },
        { field: 'role', headerName: 'Албан тушаал', width: 150 },
        {
            field: DESCRIPTION, width: 170, renderCell: (cellValue: any) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size='small'
                        onClick={() => renderModal(cellValue.row._id)}
                    >
                        БАГ-Д НЭМЭХ
                    </Button>
                );
            },
        },
    ];

    return (
        <Box>
            {loading && <Box>Уншиж байна...</Box>}
            <DataGrid
                sx={{ height: 640, width: 800 }}
                getRowId={(row) => row._id}
                rows={data ? data.getUsers : []}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            />
            <CustomModal open={open} setOpen={setOpen}>
                {grpData && grpData.getGroups.map((grp: any, i: number) =>
                    <Box
                        sx={{ width: 100, height: 20, cursor: 'pointer', background: group.id == grp._id ? 'gray' : 'white' }}
                        key={i} onClick={() => setGroup({ name: grp.name, id: grp._id })}>
                        {grp.name}
                    </Box>)}
                <TextField value={permission} onChange={(e) => setPermission(e.target.value)} placeholder='DEV OPS' />
                <Button
                    variant="contained"
                    color="primary"
                    size='small'
                    onClick={() => invite()}
                >
                    УРИХ
                </Button>
            </CustomModal>
        </Box>
    )
}