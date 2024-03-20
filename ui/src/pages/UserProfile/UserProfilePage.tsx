import { useUserContext } from '../../contexts/UserContext.tsx';
import styled from 'styled-components';
import Input from '../../components/Input/Input.tsx';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../components/Button/Button.tsx';
import { FlexRow } from '../../components/styles.ts';
import { validateEmail, validatePasswords } from '../../utils/validators.ts';
import { User } from '../../contexts/types.ts';

const UserProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const UserProfilePage = () => {
  const { user, updateUser } = useUserContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(user?.email || '');
  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');

  useEffect(() => {
    setEmail(user?.email || '');
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
  }, [user]);

  const onSubmit = () => {
    if (!validatePasswords(newPassword, confirmPassword) || !user) return;

    const newUser: User = {
      ...user,
      email,
      firstName,
      lastName
    };

    updateUser(newUser, currentPassword, newPassword);

    setIsEdit(false);
  };

  return (
    <UserProfilePageContainer data-testid="UserProfilePage.container">
      <h1>User Profile Info</h1>
      <Input
        data-testid="UserProfilePage.username"
        label="Username"
        validated
        inputKey="username"
        value={user?.username || ''}
        disabled />
      <Input
        data-testid="UserProfilePage.email"
        label="Email"
        validated={validateEmail(email)}
        inputKey="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); }}
        disabled={!isEdit} />
      <Input
        data-testid="UserProfilePage.firstName"
        label="First Name"
        validated
        inputKey="firstName"
        value={firstName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => { setFirstName(e.target.value); }}
        disabled={!isEdit} />
      <Input
        data-testid="UserProfilePage.lastName"
        label="Last Name"
        validated
        inputKey="lastName"
        value={lastName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => { setLastName(e.target.value); }}
        disabled={!isEdit} />
      <h1>Password</h1>
      <Input
        data-testid="UserProfilePage.currentPassword"
        label="Current Password"
        validated
        inputKey="currentPassword"
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => { setCurrentPassword(e.target.value); }}
        disabled={!isEdit} />
      <Input
        data-testid="UserProfilePage.newPassword"
        label="New Password"
        validated={validatePasswords(newPassword, confirmPassword)}
        inputKey="newPassword"
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewPassword(e.target.value); }}
        disabled={!isEdit} />
      <Input
        data-testid="UserProfilePage.confirmPassword"
        label="Confirm Password"
        validated={validatePasswords(newPassword, confirmPassword)}
        inputKey="confirmPassword"
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => { setConfirmPassword(e.target.value); }}
        disabled={!isEdit} />

      <FlexRow>
        <Button onClick={() => setIsEdit(!isEdit)} text={isEdit ? 'Cancel' : 'Edit'} data-testid="UserProfilePage.button.edit" />
        {isEdit ? <Button text="Save" onClick={onSubmit} data-testid="UserProfilePage.button.save" /> : null}
      </FlexRow>
    </UserProfilePageContainer>
  );
};

export default UserProfilePage;
