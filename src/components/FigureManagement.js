import { formatDate } from '../utils/formatters';
import { Box, extendTheme, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { AppProvider, DashboardLayout, PageContainer, ThemeSwitcher } from '@toolpad/core';
import SearchIcon from '@mui/icons-material/Search';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

import { useEffect, useState, useMemo } from "react";

import axios from '../utils/axiosValidationInterceptor';
import FigureView from './FigureView';
import Dashboard from './Dashboard';
import FigureListing from './FigureListing';

function createNavigation(basicFigurines, lineups) {
    let initialNav = [
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
        }
    ];

    lineups.forEach((lineup) => {
        const children = createChildren(basicFigurines, lineup);

        initialNav.push({
            segment: lineup.key.toLowerCase().replace(/_+/g, ''),
            title: lineup.description,
            icon: <CategoryRoundedIcon />,
            children: children
        });
    });

    let endingNav = [
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

    initialNav.push(...endingNav);

    return initialNav;
}

function createChildren(basicFigurines, lineup) {
    let children = [];

    basicFigurines
        .filter(figurine => figurine.lineUp === lineup.key)
        .forEach((figurine) => {
            children.push({
                segment: 'figurine-' + figurine.id,
                icon: <Tooltip title={formatDate(figurine.releaseDate, figurine.releaseDateConfirmed)}>{figurine.status === 'RELEASED' ? figurine.revival ? <Person4RoundedIcon /> : figurine.set ? <PeopleAltRoundedIcon /> : <PersonRoundedIcon /> : <PersonOutlineRoundedIcon />}</Tooltip>,
                title: figurine.displayableName,
            });
        });

    return children;
}

function SidebarFooter({ mini }) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {mini ? '© Myth' : `© ${new Date().getFullYear()} Made with passion`}
        </Typography>
    );
}

function ToolbarActionsSearch() {
    return (
        <Stack direction="row">
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: 'inline', md: 'none' },
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="button" aria-label="search" size="small">
                                <SearchIcon />
                            </IconButton>
                        ),
                        sx: { pr: 0.5 },
                    },
                }}
                sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
            />
            <ThemeSwitcher />
        </Stack>
    );
}

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
    const [pathname, setPathname] = useState(initialPath);

    const router = useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const Reports = () => <h1>Reports</h1>;
const Default = () => <h1>Default Page</h1>;

function PageContent({ pathname }) {
    let currentPage;
    const FIGURINE_PREFIX = "figurine-";

    if (pathname === "/dashboard") {
        currentPage = <Dashboard />
    } else if (pathname === "/figurines") {
        currentPage = <FigureListing />;
    } else if (pathname.includes(FIGURINE_PREFIX)) {
        let index = pathname.indexOf(FIGURINE_PREFIX);
        const figurineId = pathname.substring(index + FIGURINE_PREFIX.length);
        currentPage = <FigureView id={figurineId} />;
    } else if (pathname === "/reports/sales") {
        currentPage = <Reports />;
    } else {
        currentPage = <Default />
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
    const [navigation, setNavigation] = useState([]);

    const fetchData = async () => {
        try {
            const lineupsResponse = await axios.get('/lineups');
            const basicFigurinesResponse = await axios.get('/figurines/basics');
            setNavigation(createNavigation(basicFigurinesResponse.data, lineupsResponse.data));
        } catch (err) {
            console.error('Error creating the navigation');
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this runs once when the component mounts

    const { window } = props;
    const router = useDemoRouter('/dashboard');
    // Remove this const when copying and pasting into your project.
    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            branding={{
                logo: <img src="https://imagizer.imageshack.com/img924/4838/XOVydL.png" alt="MUI logo" />,
                title: 'Myth Collection',
                homeUrl: '/dashboard',
            }}
            navigation={navigation}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout slots={{
                toolbarActions: ToolbarActionsSearch,
                sidebarFooter: SidebarFooter,
            }}>
                <PageContainer>
                    <PageContent pathname={router.pathname} />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
};
export default FigureManagement;