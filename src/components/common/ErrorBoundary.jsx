import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
              p: 4,
              borderRadius: 3,
              bgcolor: 'white',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" color="error" gutterBottom>
              Oops! Something went wrong
            </Typography>
            
            <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2">
                {this.state.error?.message || 'An unexpected error occurred'}
              </Typography>
            </Alert>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              We're sorry for the inconvenience. Please try refreshing the page.
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{
                background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)'
                }
              }}
            >
              Refresh Page
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;