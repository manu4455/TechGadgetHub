'use client'
import React, { useState, useEffect } from 'react';
import { Box, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on the scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Box position="fixed" bottom="2rem" right="2rem">
      {isVisible && (
        <IconButton
          onClick={scrollToTop}
          icon={<ChevronUpIcon />}
          aria-label="Scroll to top"
          isRound
          size="lg"
          bg={useColorModeValue('green.300', 'green.500')}
          _hover={{
            bg: useColorModeValue('green.600', 'green.400'),
          }}
        />
      )}
    </Box>
  );
};

export default ScrollToTop;
