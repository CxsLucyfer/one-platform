import { Button, Nav, NavItem, NavList, OptionsMenu, OptionsMenuItem, OptionsMenuToggle, Title } from '@patternfly/react-core';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useMyAppsAPI from '../hooks/useMyAppsAPI';
import './Sidebar.css';

function Sidebar () {
  const { apps } = useMyAppsAPI();
  const { appId, app, loading, setApp } = useContext( AppContext );

  const location = useLocation();

  const [ appMenuOptions, setAppMenuOptions ] = useState<any[]>([]);

  const [ appsListOpen, setAppsListOpen ] = useState<boolean>();

  const handleSelect = useCallback( ( appId: string ) => {
    setApp( appId );
    setAppsListOpen( false );
  }, [ setApp ] );

  useEffect( () => {
    setAppMenuOptions( apps.map( ({ id, name, appId: appSlug }) => (
      <OptionsMenuItem
        key={ id }
        id={ id }
        isSelected={ appSlug === appId }
        onSelect={ () => handleSelect( appSlug ) }>
        { name }
      </OptionsMenuItem>
    ) ) );
  }, [apps, appId, handleSelect] );

  const appsMenuToggle = <OptionsMenuToggle onToggle={ () => {setAppsListOpen( !appsListOpen )} } toggleTemplate={ loading ? 'Loading...' : app?.name }></OptionsMenuToggle>;

  const integrations = [
    { name: 'OP Navbar', path: 'op-navbar', },
    { name: 'Database', path: 'database', },
    { name: 'Feedback', path: 'feedback', },
    { name: 'Search', path: 'search', },
    { name: 'Notifications', path: 'notifications' },
    { name: 'Lighthouse', path: 'lighthouse' },
  ];

  const isNavItemActive = useCallback( ( path: string ) => {
    return location.pathname.startsWith( `/${ appId }/${ path }` );
  }, [appId, location.pathname] );

  return (
    <>
      <Nav theme="light" className="app-details--sidebar pf-u-box-shadow-md-right">

        {/* TODO: use context selector instead of options menu (https://www.patternfly.org/v4/components/context-selector) */}
        <OptionsMenu
          className="app-menu--list"
          id="app-list-options-menu"
          menuItems={ appMenuOptions }
          isOpen={ appsListOpen }
          toggle={appsMenuToggle} />

        <Link style={{ display: 'none' }} to="/"><Button id="test123" width="100%" variant="plain"><ion-icon name="arrow-back-outline"></ion-icon>&nbsp;Go Back</Button></Link>

        <NavList className="app-details--sidebar--main-nav">
          <NavItem isActive={ isNavItemActive( 'overview' ) }>
            <Link to={`/${ appId}/overview`}>Overview</Link>
          </NavItem>
          <NavItem isActive={ isNavItemActive( 'analytics' ) }>
            <Link to={`/${ appId}/analytics`}>Analytics</Link>
          </NavItem>

          <Title headingLevel="h4" className="app-details--sidebar--title pf-u-color-400 pf-u-px-md">Integrations</Title>

          { integrations.map( ( { name, path }, index ) => (
            <NavItem key={index} isActive={isNavItemActive( path )}>
              <Link to={`/${appId}/${path}`}>{ name }</Link>
            </NavItem>
          ))}
        </NavList>
        <NavList className="app-details--sidebar--settings pf-u-mt-auto">
          <NavItem isActive={ isNavItemActive('settings') }>
            <Link to={`/${ appId}/settings`}>
              App Settings
              <ion-icon class="pf-u-ml-auto pf-u-my-auto" name="settings-outline"></ion-icon>
            </Link>
          </NavItem>
        </NavList>
        </Nav>
    </>
  );
}

export default Sidebar;
