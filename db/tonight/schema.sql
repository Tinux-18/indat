CREATE TABLE IF NOT EXISTS tonight_activities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE tonight_activities ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE tonight_activities DROP COLUMN IF EXISTS image_photographer;
ALTER TABLE tonight_activities DROP COLUMN IF EXISTS image_photographer_url;

-- Prevent accidental duplicate active items (partners adding the same thing twice)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tonight_activities_name_active
  ON tonight_activities (lower(name)) WHERE is_archived = FALSE;

CREATE TABLE IF NOT EXISTS tonight_picks (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER NOT NULL REFERENCES tonight_activities(id),
  picked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tonight_picks_picked_at ON tonight_picks (picked_at);

INSERT INTO tonight_activities (name) VALUES
  ('Watch a film'),
  ('Watch a series'),
  ('Go for a walk')
ON CONFLICT DO NOTHING;
