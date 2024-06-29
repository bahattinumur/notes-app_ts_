import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import NoteCard from "./Form /NoteCard";
import { Note, Tag } from "../types";
import { useMemo, useState } from "react";
type MainProps = {
  notes: Note[];
  availableTags: Tag[];
};
const MainPage = ({ availableTags, notes }: MainProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          // Notun başlığını arattığım metin içeriyorsa notları dönderir
          (note.title == "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => tag.id == noteTag.id)
            ))
        );
      }),

    [title, selectedTags, notes]
  );

  return (
    <div className="container py-5">
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notes</h1>
        <Link to={"/new"}>
          <Button>Create</Button>
        </Link>
      </Stack>
      {/* Fitreleme Alanı */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search by Title</Form.Label>
              <Form.Control
                className="shadow"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search by Tag</Form.Label>
              <ReactSelect
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                // Daha önceden oluşturulanları listeleme
                options={availableTags.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* Notlar */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};import { Button, Col, Form, Row, Stack } from "react-bootstrap";


export default MainPage;
