import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import BoyIcon from '@mui/icons-material/Boy';
import { Box } from '@mui/material';
import FigureListing from '../FigureListing/FigureListing';
import FigurineView from '../FigurineView';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Figurines',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'figurines',
        title: 'All figurines',
        icon: <ListAltIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Myth Cloth Series',
    },
    {
        segment: 'mythcloth',
        title: 'Myth Cloth',
        icon: <CategoryRoundedIcon />,
    },
    {
        segment: 'appendix',
        title: 'Appendix',
        icon: <CategoryRoundedIcon />,
    },
    {
        segment: 'mythclothex',
        title: 'Myth Cloth EX',
        icon: <CategoryRoundedIcon />,
        children: [
            {
                segment: 'd1',
                title: "A very long string",
                icon: <ClassRoundedIcon />,
            },
            {
                segment: 'd2',
                title: "Final Bronze Cloth",
                icon: <ClassRoundedIcon />,
                children: [
                    {
                        segment: 'figurine-67be359e6578fb2bace596b6',
                        title: "Cygnus Hyoga [Final Bronze Cloth]",
                        icon: <BoyIcon />
                    },
                    {
                        segment: 'figurine-67be359e6578fb2bace596ba',
                        title: "Pegasus Seiya [Final Bronze Cloth] ~Golden Limited Edition~",
                        icon: <BoyIcon />
                    },
                    {
                        segment: 'figurine-67be359e6578fb2bace596bf',
                        title: "Andromeda Shun [Final Bronze Cloth]",
                        icon: <BoyIcon />
                    }
                ]
            }
        ]
    },
    {
        kind: 'divider',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];


const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const AdminDashboard2 = () => <h1>Welcome, User2</h1>;
const AdminDashboard3 = () => <h1>Welcome, User3</h1>;

function PageContent({ pathname }) {
    console.log(pathname);
    let currentPage;
    if (pathname === "/figurines") {
        currentPage = <FigureListing />;
    } else if (pathname === "/reports/sales") {
        currentPage = <AdminDashboard2 />;
    } else if (pathname.includes('figurine-')) {
        currentPage = <FigurineView />;
    } else {
        currentPage = <AdminDashboard3 />;
    }

    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            {currentPage}
        </Box>
    );
}

const FigureManagement = (props) => {

    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <PageContainer>
                    <PageContent pathname={router.pathname} />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
export default FigureManagement;