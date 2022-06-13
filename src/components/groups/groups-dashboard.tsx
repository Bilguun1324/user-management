import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../graphql';
import { Box } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';

export const GroupsDashboard = () => {
    const { data, loading } = useQuery(GET_GROUPS)

    const columns = [
        { field: 'name', headerName: 'Нэр', width: 150 },
    ];

    return (
        <Box>
            {loading && <Box>loading</Box>}
            <DataGrid
                sx={{ height: 640, width: 600 }}
                getRowId={(row) => row._id}
                rows={data ? data.getGroups : []}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            />
        </Box>
    )
}