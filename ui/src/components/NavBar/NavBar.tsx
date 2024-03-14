import './NavBar.css';
import { Left, Right } from '../styles.ts';
import HorizontalSpacer from '../Spacer/HorizontalSpacer.tsx';
import Button from '../Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './components/UserAvatar/UserAvatar.tsx';
import Search, { DataType } from '../Search/Search.tsx';
import { useEffect, useState } from 'react';
import { useRestApiContext } from '../../contexts/RestApiContext.tsx';

type SearchPage = {
  id: string;
  name: string;
  projectId: string;
};

export const NavBar = () => {
  const navigate = useNavigate();
  const api = useRestApiContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pages, setPages] = useState<Array<SearchPage>>([]);
  const [data, setData] = useState<Array<DataType>>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      api.get(`/api/v1/pages/search?searchTerm=${searchTerm}`).then((response: Response) => {
        response.json().then((data: Array<SearchPage>) => {
          setPages(data);
          setData(data.map((page) => ({ key: page.id, value: page.name })));
        });
      });
    } else {
      setPages([]);
      setData([]);
    }
  }, [searchTerm]);

  const onSelect = (selectedPage?: DataType) => {
    if (!selectedPage) {
      setData([]);
      setPages([]);
      return;
    }

    const page = pages.find((page) => page.id === selectedPage.key);

    if (page) {
      navigate(`/projects/${page.projectId}/pages/${page.id}`);
      navigate(0);
      setPages([]);
      setData([]);
    }
  };

  return (
    <div className="app-navbar" data-testid="NavBar.container">
      <Left>
        <div>asWiki</div>
        <HorizontalSpacer marginLeft={10} marginRight={10}/>
        <Button onClick={() => navigate('/projects')}
          iconName='bi-folder2'
          text='Projects'
          padding={'7px 0 0 0'}
          data-testid='NavBar.button.projects'
        />
      </Left>
      <Right>
        <Search onChange={setSearchTerm} onSelect={onSelect} data={data} data-testid='NavBar.search' />
        <UserAvatar />
      </Right>
    </div>
  );
};
