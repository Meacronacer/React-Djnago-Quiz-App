import React from 'react'
import { Tabs, Tab, Typography, Box } from '@mui/material/'
import { useAppSelector } from '../../hooks/reduxHooks';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  answers: any;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, answers, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h5'>{children}</Typography>
                      {answers}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BasicTabs = ({data}: any) => {
  const [value, setValue] = React.useState(0);
  const { userAnswers } = useAppSelector(state => state.answers)

  const checkAnswers = (answer:any, correct:any, userAnswers:any) => {
    if (userAnswers[answer]) {
        if (correct && userAnswers[answer] === correct) {
            return 'green'
        } else {
            return 'red'
        }
    } else {
        return 'grey'
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabHeader = data.map((_:void, index:any) => {
        return <Tab key={index} label={index+1} {...a11yProps(index+1)} />
  })

  const tabContent = data.map((item:any, index:any) => {
        const items = item.answers.map((item:any, index2:any) => {
            const color = checkAnswers(item[index2], item['correct'], userAnswers[index])
            return <Typography color='white'
                variant="h5"
                style={{backgroundColor: (item['correct'] ? 'green': color), display:'flex'}}
                sx={{ mt: 2, mb: 2, p: 2}} key={index2}
                >{item[index2]} <Typography sx={{ ml: 'auto'}}>{
                    ['green','red'].includes(color) && 'Your Answer'
                }</Typography> 
            </Typography>
        })    
        return <CustomTabPanel key={index} answers={items} value={value} index={index}>
                    {item.question}
               </CustomTabPanel>
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs scrollButtons="auto" variant="scrollable" value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabHeader}
        </Tabs>
      </Box>
      {tabContent}
    </Box>
  );
}

export default BasicTabs;