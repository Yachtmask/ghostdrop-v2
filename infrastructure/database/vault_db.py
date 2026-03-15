import sqlite3
import time

DATABASE = "vaults.db"

conn = sqlite3.connect(DATABASE, check_same_thread=False)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS vaults(
    vault_id TEXT,
    cid TEXT,
    deadline INTEGER,
    recipients TEXT
)
""")

conn.commit()


def create_vault_record(vault_id, cid, deadline, recipients):

    cursor.execute(
        "INSERT INTO vaults VALUES (?, ?, ?, ?)",
        (vault_id, cid, deadline, recipients)
    )

    conn.commit()


def get_all_vaults():

    cursor.execute("SELECT * FROM vaults")

    return cursor.fetchall()


def update_deadline(vault_id, new_deadline):

    cursor.execute(
        "UPDATE vaults SET deadline=? WHERE vault_id=?",
        (new_deadline, vault_id)
    )

    conn.commit()
