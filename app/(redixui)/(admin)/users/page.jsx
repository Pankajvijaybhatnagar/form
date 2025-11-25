"use client";

import React, { useEffect, useState } from "react";
import { Table, Flex, Text, Button, Spinner } from "@radix-ui/themes";
import userServices from "@/lib/services/userServices";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const UsersPage = () => {
  const { access_token } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    const response = await userServices.getUsers({ limit: 20, page }, access_token);
    console.log(response)
    

    if (response.success) {
      setUsers(response.data?.data || []); // backend may return users or array
    } else {
      setError(response.error || "Failed to load users");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <Flex direction="column" gap="4" style={{ width: "100%" }}>
      <Text size="6" weight="bold">
        Users List
      </Text>

      {/* LOADING */}
      {loading && (
        <Flex justify="center" align="center" style={{ padding: "2rem" }}>
          <Spinner size="3" /> &nbsp; Loading users...
        </Flex>
      )}

      {/* ERROR */}
      {error && (
        <Text color="red" size="3">
          {error}
        </Text>
      )}

      {/* TABLE */}
      {!loading && !error && (
        <>
        <Table.Root variant="ghost" size={1} >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Verified</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>more</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role || "user"}</Table.Cell>
                <Table.Cell>
                  {user.is_verified ? (
                    <Text color="green">✔ Verified</Text>
                  ) : (
                    <Text color="red">✖ Not Verified</Text>
                  )}
                </Table.Cell>
                <Table.Cell >
                  <Link href={`/admin/users/${user.id}`}>edit</Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        
        </>

        
      )}

      {/* PAGINATION */}
      <Flex justify="between" mt="2">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          variant="soft"
        >
          Previous
        </Button>

        <Text>Page {page}</Text>

        <Button onClick={() => setPage(page + 1)} variant="soft">
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default UsersPage;
