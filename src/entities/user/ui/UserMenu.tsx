import { Menu, UnstyledButton, Group, Avatar, Text } from '@mantine/core'
import { IconLogout, IconUser } from '@tabler/icons-react'
import type { User } from '../model/types'

interface UserMenuProps {
  user: User
  onLogout: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const displayName = user.name ?? user.username
  const displayEmail = user.email ?? user.username

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Group gap="xs">
            <Avatar radius="xl" size="sm" color="blue">
              {displayName[0]}
            </Avatar>
            <Text size="sm" fw={500}>
              {displayName}
            </Text>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{displayEmail}</Menu.Label>
        <Menu.Item leftSection={<IconUser size={14} />} disabled>
          프로필
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={onLogout}
        >
          로그아웃
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
