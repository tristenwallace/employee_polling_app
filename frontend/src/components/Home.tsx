import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchPolls } from '../features/pollSlice';
import PollList from './PollList';
import { AppDispatch, RootState } from '../app/store';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showAnswered, setShowAnswered] = useState(false);
  const polls = useSelector((state: RootState) => state.poll.polls);
  const pollStatus = useSelector((state: RootState) => state.poll.status);
  const error = useSelector((state: RootState) => state.poll.error);
  const user = useSelector((state: RootState) => state.users.currentUser);

  // Fetch polls when component mounts or status changes to idle
  useEffect(() => {
    if (pollStatus === 'idle') {
      dispatch(fetchPolls());
    }
  }, [pollStatus, dispatch]);

  // Conditional rendering based on authentication and data loading status
  if (!user) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Please log in to see the polls.
        </Typography>
      </Container>
    );
  }

  // Show loading indicator during data fetch
  if (pollStatus === 'loading') return <CircularProgress />;
  // Display error if data fetch fails
  if (error) return <Typography>Error: {error}</Typography>;
  // Message if no polls are available
  if (pollStatus === 'succeeded' && !Object.keys(polls).length)
    return <Typography>No polls available.</Typography>;

  // Filter polls into answered and unanswered based on current user's activity
  const answeredPolls = Object.values(polls).filter(
    poll =>
      poll.optionOne.votes.includes(user.id) ||
      poll.optionTwo.votes.includes(user.id),
  );
  const unansweredPolls = Object.values(polls).filter(
    poll =>
      !poll.optionOne.votes.includes(user.id) &&
      !poll.optionTwo.votes.includes(user.id),
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Welcome, {user.name}!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowAnswered(!showAnswered)}
        >
          Show {showAnswered ? 'Unanswered' : 'Answered'} Polls
        </Button>
        <Button
          component={RouterLink}
          to="/create"
          variant="outlined"
          color="primary"
        >
          Create New Poll
        </Button>
        <Button
          component={RouterLink}
          to="/leaderboard"
          variant="outlined"
          color="primary"
        >
          Go to Leaderboard
        </Button>
      </Box>
      <Grid container spacing={2}>
        {showAnswered ? (
          <PollList polls={answeredPolls} />
        ) : (
          <PollList polls={unansweredPolls} />
        )}
      </Grid>
    </Container>
  );
};

export default Home;