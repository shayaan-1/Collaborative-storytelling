export const getUserStories = (userId) => {
  return [
    {
      id: '1',
      title: 'The Last Spellweaver',
      status: 'draft',
      lastEdited: '2023-05-15',
      wordCount: 2450,
      collaborators: [],
      genre: 'Fantasy'
    },
    {
      id: '2',
      title: 'Neon Shadows',
      status: 'live',
      lastEdited: '2023-05-10',
      wordCount: 8740,
      collaborators: ['user2'],
      genre: 'Cyberpunk'
    },
    {
      id: '3',
      title: 'Whispers in the Dark',
      status: 'completed',
      lastEdited: '2023-04-28',
      wordCount: 15200,
      collaborators: [],
      genre: 'Horror'
    }
  ];
};

export const getExploreStories = () => {
  return [
    {
      id: '4',
      title: 'Galactic Nomads',
      author: 'spaceWriter42',
      likes: 124,
      createdAt: '2023-05-12',
      genre: 'Sci-Fi'
    },
    {
      id: '5',
      title: 'The Baker Street Irregular',
      author: 'mysteryLover',
      likes: 89,
      createdAt: '2023-05-08',
      genre: 'Mystery'
    },
    {
      id: '6',
      title: 'Crimson Tides',
      author: 'historicalFan',
      likes: 203,
      createdAt: '2023-04-30',
      genre: 'Historical Fiction'
    }
  ];
};