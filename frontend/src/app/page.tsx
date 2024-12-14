'use client'

import styles from "./page.module.scss";
import {
  Box,
  Divider,
  Paper, Tab, Tabs,
  Typography
} from '@mui/material'
import { useState } from 'react'
import TabPanel from '@/components/ui/TabPanel'
import EmployeeView from '@/app/EmployeeView'
import PostView from '@/app/PostView'

export default function Home() {
  const [tab, setTab] = useState(0)

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div className={styles.page}>
        <header>
            <Box style={{textAlign: 'center'}}>
                <Typography variant="h4" sx={{ my: 2 }}>
                    MyApp
                </Typography>
                <Divider />
            </Box>
        </header>
        <main>
            <Paper className={styles.workPanel} elevation={5}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Сотрудники" {...a11yProps(0)} />
                    <Tab label="Должности" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                  <EmployeeView/>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <PostView/>
                </TabPanel>
              </Box>
            </Paper>
        </main>
    </div>
  );
}
