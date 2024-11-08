'use client';
import BlankStateSystemError from '@/components/BlankState/BlankStateSystemError';
import LoginFooter from '@/components/Footer/LoginFooter';
import LoginNavbar from '@/components/Navbar/LoginNavbar';
import { useAuthContext } from '@/contexts/auth.context';
import { logout } from '@/services/auth.service';
import { Box, Button, FormControl, Heading, PageLayout } from '@primer/react';
import React, { useEffect } from 'react';
import './main.css';

const Logout = () => {
  const { handleCheckToken } = useAuthContext();

  useEffect(() => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        handleCheckToken(token).finally(() => {});
      } else {
      }
    } catch (error) {
      <BlankStateSystemError httpError={error as Record<string, unknown>} />;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <PageLayout
      sx={{
        padding: 0,
        margin: 0,
      }}
    >
      <PageLayout.Header
        sx={{
          width: '100%',
          margin: 0,
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingTop: 5,
          paddingBottom: 4,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <LoginNavbar />
      </PageLayout.Header>
      <PageLayout.Content>
        <Box
          sx={{
            width: '340px',
            margin: '0 auto',
            padding: 4,
            marginTop: 3,

            textAlign: 'center',
            backgroundColor: 'transparent',
            border: '1px solid',
            borderColor: 'border.muted',
            borderRadius: 6,
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Heading
                as="h1"
                sx={{
                  fontSize: '24px',
                  fontWeight: 300,
                }}
              >
                Are you sure you want to sign out?
              </Heading>
              <Button
                type="submit"
                block
                sx={{
                  fontSize: '16px',
                  paddingY: '24px !important',
                  marginTop: 5,
                }}
              >
                Sign out
              </Button>
            </FormControl>
          </form>
        </Box>
      </PageLayout.Content>
      <PageLayout.Footer
        sx={{
          maxWidth: 1012,
          marginRight: 'auto',
          marginLeft: 'auto',

          paddingX: [16, 40, 40, 16],
          paddingY: 6,
          marginTop: 6,
          fontSize: '12px',
        }}
      >
        <LoginFooter />
      </PageLayout.Footer>
    </PageLayout>
  );
};

export default Logout;
