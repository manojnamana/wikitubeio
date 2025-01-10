
// @ts-nocheck
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { 
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  Settings as SettingsIcon,
  CalendarMonth as CalendarIcon,
  Psychology as BrainIcon,
  Insights as ActivityIcon,
  SmartToy as BotIcon,
  Description as FileTextIcon,
  Schedule as ClockIcon,
  Forum as MessageSquareIcon,
  Search as SearchIcon,
  KeyboardArrowDown as ChevronDownIcon,
  Edit as PenSquareIcon,
  CheckBox as ListTodoIcon,
  PlayArrow as PlayIcon,
  CalendarToday as CalendarPlusIcon,
  Chat as MessageCircleIcon,
  MenuBook as BookOpenIcon,
  Calculate as CalculatorIcon,
  EmojiEvents as CrownIcon,
  BarChart as BarChartIcon,
  ViewCompact as LayoutIcon
} from '@mui/icons-material';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

// QuickActions component
const QuickActions = () => {
  const actions = [
    { icon: <PenSquareIcon />, label: 'Take Note', color: 'success' },
    { icon: <ListTodoIcon />, label: 'Add Task', color: 'primary' },
    { icon: <PlayIcon />, label: 'Start MCQ', color: 'secondary' },
    { icon: <CalendarPlusIcon />, label: 'Schedule', color: 'warning' },
    { icon: <MessageCircleIcon />, label: 'Discussion', color: 'error' },
    { icon: <BookOpenIcon />, label: 'Quick Study', color: 'info' },
    { icon: <CalculatorIcon />, label: 'Calculator', color: 'primary' },
    { icon: <CrownIcon />, label: 'Progress', color: 'warning' }
  ];

  return (
    <Paper sx={{ mb: 3, p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ overflowX: 'auto' }}>
        {actions.map(({ icon, label, color }) => (
          <Button
            key={label}
            variant="text"
            color={color}
            startIcon={icon}
            sx={{ minWidth: 100, flexDirection: 'column', gap: 1 }}
          >
            <Typography variant="caption">{label}</Typography>
          </Button>
        ))}
      </Stack>
    </Paper>
  );
};

// TopNav component
const TopNav = ({ mode, setMode, layout, setLayout, editMode, setEditMode }) => {
  return (
    <Paper sx={{ mb: 3, p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControl size="small">
          <Select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            IconComponent={ChevronDownIcon}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="resident">Resident</MenuItem>
            <MenuItem value="clinician">Clinician</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <Select
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
            IconComponent={ChevronDownIcon}
          >
            <MenuItem value="default">Default Layout</MenuItem>
            <MenuItem value="exam">Exam Prep</MenuItem>
            <MenuItem value="clinical">Clinical</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          fullWidth
          placeholder="Search resources, MCQs, notes..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant={editMode ? "contained" : "outlined"}
          onClick={() => setEditMode(!editMode)}
          startIcon={<LayoutIcon />}
        >
          {editMode ? 'Save' : 'Edit Layout'}
        </Button>
      </Stack>
    </Paper>
  );
};

// Widget component
const Widget = ({ title, icon: Icon, size = "medium", onResize, children }) => {
  const heights = {
    small: 200,
    medium: 300,
    large: 400
  };

  return (
    <StyledCard>
      <CardHeader
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <Icon color="primary" />
            <Typography variant="h6">{title}</Typography>
          </Stack>
        }
        action={
          <Stack direction="row" spacing={1}>
            {size !== "small" && (
              <IconButton onClick={() => onResize("small")} size="small">
                <MinimizeIcon />
              </IconButton>
            )}
            {size !== "large" && (
              <IconButton onClick={() => onResize("large")} size="small">
                <MaximizeIcon />
              </IconButton>
            )}
            <IconButton size="small">
              <SettingsIcon />
            </IconButton>
          </Stack>
        }
      />
      <CardContent sx={{ height: heights[size], overflow: 'auto' }}>
        {children}
      </CardContent>
    </StyledCard>
  );
};

const Dashboard = () => {
  const [mode, setMode] = useState("student");
  const [layout, setLayout] = useState("default");
  const [editMode, setEditMode] = useState(false);

  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', p: 3 }}>
      <Container maxWidth="xl">
        <TopNav 
          mode={mode}
          setMode={setMode}
          layout={layout}
          setLayout={setLayout}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <QuickActions />

        <Grid container spacing={3}>
          {/* Focus Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Focus Areas" icon={BrainIcon} size="medium">
              <Stack spacing={2}>
                <Paper sx={{ p: 2, bgcolor: 'error.light' }}>
                  <Typography color="error.dark" fontWeight="medium">
                    Weakness: Cardiology
                  </Typography>
                  <Typography variant="body2" color="error.dark">
                    72% accuracy in MCQs
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                  <Typography color="success.dark" fontWeight="medium">
                    Strength: Neurology
                  </Typography>
                  <Typography variant="body2" color="success.dark">
                    94% accuracy in MCQs
                  </Typography>
                </Paper>
              </Stack>
            </Widget>
          </Grid>

          {/* Tasks Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Today's Tasks" icon={ActivityIcon} size="medium">
              <Stack spacing={1}>
                {['Complete Cardiology MCQs', 'Review Lecture Notes', 'Practice Cases'].map((task) => (
                  <Paper key={task} sx={{ p: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Checkbox size="small" />
                      <Typography>{task}</Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Widget>
          </Grid>

          {/* Calendar Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Study Calendar" icon={CalendarIcon} size="large">
              <Grid container spacing={0.5}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Grid key={day} item xs={12/7}>
                    <Typography variant="body2" align="center" fontWeight="medium">
                      {day}
                    </Typography>
                  </Grid>
                ))}
                {Array(35).fill(null).map((_, i) => (
                  <Grid key={i} item xs={12/7}>
                    <Paper
                      sx={{
                        p: 1,
                        textAlign: 'center',
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    >
                      {((i % 31) + 1)}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Widget>
          </Grid>

          {/* Performance Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Performance Analytics" icon={BarChartIcon} size="large">
              <Stack spacing={2}>
                <Paper sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Performance Chart Placeholder
                </Paper>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Weekly Progress
                      </Typography>
                      <Typography variant="h6">+12%</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Study Hours
                      </Typography>
                      <Typography variant="h6">24h</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Stack>
            </Widget>
          </Grid>

          {/* AI Recommendations */}
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="AI Recommendations" icon={BotIcon} size="medium">
              <Stack spacing={2}>
                {[
                  'Practice ECG interpretation MCQs',
                  'Review Heart Failure guidelines',
                  'Schedule Cardiology review session'
                ].map((rec) => (
                  <Paper key={rec} sx={{ p: 2, bgcolor: 'primary.light' }}>
                    <Typography color="primary.dark">{rec}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Widget>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Recent Activity" icon={ClockIcon} size="small">
              <Stack divider={<Divider />} spacing={1}>
                {[
                  'Completed Cardiology MCQ Set',
                  'Added study notes',
                  'Joined discussion'
                ].map((activity) => (
                  <Typography key={activity} variant="body2" sx={{ p: 1 }}>
                    {activity}
                  </Typography>
                ))}
              </Stack>
            </Widget>
          </Grid>

          {/* Discussion Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Discussions" icon={MessageSquareIcon} size="medium">
              <Stack spacing={2}>
                {[
                  'ECG Interpretation Tips',
                  'USMLE Step 1 Study Group',
                  'Clinical Cases Discussion'
                ].map((thread) => (
                  <Paper key={thread} sx={{ p: 2 }}>
                    <Typography fontWeight="medium">{thread}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      12 new replies
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Widget>
          </Grid>

          {/* Journal Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Nucleus Journal" icon={FileTextIcon} size="medium">
              <Stack spacing={2}>
                {[
                  'Cardiology Notes - Week 3',
                  'Patient Case Summaries',
                  'Study Schedule Template'
                ].map((entry) => (
                  <Paper key={entry} sx={{ p: 2 }}>
                    <Typography fontWeight="medium">{entry}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last edited 2h ago
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Widget>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;