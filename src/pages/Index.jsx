import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useToast, Flex, Heading, Text } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (!input) {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTasks = [...tasks, { id: Date.now(), content: input }];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setInput('');
    toast({
      title: 'Task added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    toast({
      title: 'Task deleted',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  const editTask = (id, content) => {
    const newTasks = tasks.map(task => task.id === id ? { ...task, content } : task);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    toast({
      title: 'Task updated',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" mb={5}>
        <Heading>Todo App</Heading>
      </Flex>
      <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addTask} mt={2}>
        Add Task
      </Button>
      <List spacing={3} mt={5}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <Text>{task.content}</Text>
            <Box>
              <IconButton icon={<FaEdit />} onClick={() => editTask(task.id, prompt('Edit task:', task.content))} mr={2} />
              <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;