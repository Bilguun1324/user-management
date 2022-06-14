import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../graphql';
import { Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DESCRIPTION, FIRST_NAME, CustomModal } from '../common';
import { useState } from 'react';

export const GroupsDashboard = () => {
    const { data, loading } = useQuery(GET_GROUPS)
    const [open, setOpen] = useState(false)
    const [membersData, setMembersData] = useState([])

    const showModal = (members: any) => {
        setMembersData(members)
        setOpen(true)
    }

    console.log(data)

    const columns = [
        { field: 'name', headerName: FIRST_NAME, width: 150 },
        { field: 'description', headerName: DESCRIPTION, width: 300 },
        {
            field: 'Гишүүд', width: 170, renderCell: (cellValue: any) => {
                return (
                    <Box>{cellValue.row.members.length}</Box>
                );
            },
        },
        {
            field: 'Гишүүд xарах', width: 150, renderCell: (cellValue: any) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size='small'
                        onClick={() => showModal(cellValue.row.members)}
                    >
                        ХАРАХ
                    </Button>
                );
            },
        },
    ];

    return (
        <Box>
            {loading && <Box>Уншиж байна...</Box>}
            <DataGrid
                sx={{ height: 640, width: 750 }}
                getRowId={(row) => row._id}
                rows={data ? data.getGroups : []}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            />
            <CustomModal open={open} setOpen={setOpen}>
                <Box sx={{ height: 30 }}>Гишүүдийн мэргижлүүд:</Box>
                {membersData.map((member: any, i: number) => {
                    return (<Box key={i}>{member.permission}</Box>)
                })}
            </CustomModal>
        </Box>
    )
}