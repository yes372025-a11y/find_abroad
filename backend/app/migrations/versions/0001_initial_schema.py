"""Initial schema — all tables.

Revision ID: 0001
Revises:
Create Date: 2024-07-01 00:00:00.000000
"""
from __future__ import annotations

import uuid
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ── users ─────────────────────────────────────────────────────────────────
    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("email", sa.String(255), nullable=False, unique=True),
        sa.Column("hashed_password", sa.String(255), nullable=False),
        sa.Column("full_name", sa.String(255), nullable=False),
        sa.Column("phone", sa.String(20), nullable=True),
        sa.Column("role", sa.String(20), nullable=False, server_default="student"),
        sa.Column("is_active", sa.Boolean, nullable=False, server_default=sa.true()),
        sa.Column("is_verified", sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column("avatar_url", sa.String(500), nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Platform users with role-based access",
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_users_role", "users", ["role"])

    # ── students ──────────────────────────────────────────────────────────────
    op.create_table(
        "students",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True),
        sa.Column("cgpa", sa.Float, nullable=True),
        sa.Column("work_experience_years", sa.Integer, nullable=True),
        sa.Column("highest_qualification", sa.String(100), nullable=True),
        sa.Column("undergraduate_university", sa.String(255), nullable=True),
        sa.Column("undergraduate_field", sa.String(255), nullable=True),
        sa.Column("graduation_year", sa.Integer, nullable=True),
        sa.Column("family_income_annual", sa.Float, nullable=True),
        sa.Column("has_co_applicant", sa.Boolean, server_default=sa.false()),
        sa.Column("has_collateral", sa.Boolean, server_default=sa.false()),
        sa.Column("collateral_value", sa.Float, nullable=True),
        sa.Column("target_countries", sa.Text, nullable=True),
        sa.Column("target_programs", sa.Text, nullable=True),
        sa.Column("budget_usd", sa.Float, nullable=True),
        sa.Column("intended_intake", sa.String(20), nullable=True),
        sa.Column("ielts_score", sa.Float, nullable=True),
        sa.Column("toefl_score", sa.Integer, nullable=True),
        sa.Column("gre_score", sa.Integer, nullable=True),
        sa.Column("gmat_score", sa.Integer, nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Extended student academic and personal profile",
    )
    op.create_index("ix_students_user_id", "students", ["user_id"], unique=True)

    # ── universities ──────────────────────────────────────────────────────────
    op.create_table(
        "universities",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("slug", sa.String(300), nullable=False, unique=True),
        sa.Column("country", sa.String(100), nullable=False),
        sa.Column("city", sa.String(100), nullable=True),
        sa.Column("website_url", sa.String(500), nullable=True),
        sa.Column("logo_url", sa.String(500), nullable=True),
        sa.Column("banner_url", sa.String(500), nullable=True),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("world_ranking", sa.Integer, nullable=True),
        sa.Column("qs_ranking", sa.Integer, nullable=True),
        sa.Column("times_ranking", sa.Integer, nullable=True),
        sa.Column("avg_tuition_usd", sa.Numeric(12, 2), nullable=True),
        sa.Column("avg_living_cost_usd", sa.Numeric(12, 2), nullable=True),
        sa.Column("min_cgpa", sa.Float, nullable=True),
        sa.Column("min_ielts", sa.Float, nullable=True),
        sa.Column("min_toefl", sa.Integer, nullable=True),
        sa.Column("acceptance_rate", sa.Float, nullable=True),
        sa.Column("intakes", sa.String(100), nullable=True),
        sa.Column("is_featured", sa.Boolean, server_default=sa.false()),
        sa.Column("is_active", sa.Boolean, server_default=sa.true()),
        sa.Column("meta_title", sa.String(255), nullable=True),
        sa.Column("meta_description", sa.String(500), nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Universities available for study abroad applications",
    )
    op.create_index("ix_universities_country", "universities", ["country"])
    op.create_index("ix_universities_slug", "universities", ["slug"], unique=True)
    op.create_index("ix_universities_ranking", "universities", ["world_ranking"])

    # ── programs ──────────────────────────────────────────────────────────────
    op.create_table(
        "programs",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("university_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("universities.id", ondelete="CASCADE"), nullable=False),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("slug", sa.String(300), nullable=False, unique=True),
        sa.Column("level", sa.String(50), nullable=False),
        sa.Column("field", sa.String(100), nullable=True),
        sa.Column("duration_months", sa.Integer, nullable=True),
        sa.Column("tuition_usd", sa.Numeric(12, 2), nullable=True),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("requirements", sa.Text, nullable=True),
        sa.Column("is_active", sa.Boolean, server_default=sa.true()),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Degree programs linked to universities",
    )
    op.create_index("ix_programs_university_id", "programs", ["university_id"])
    op.create_index("ix_programs_level", "programs", ["level"])
    op.create_index("ix_programs_slug", "programs", ["slug"], unique=True)

    # ── scholarships ──────────────────────────────────────────────────────────
    op.create_table(
        "scholarships",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("slug", sa.String(300), nullable=False, unique=True),
        sa.Column("country", sa.String(100), nullable=False),
        sa.Column("university", sa.String(255), nullable=True),
        sa.Column("provider", sa.String(255), nullable=True),
        sa.Column("level", sa.String(50), nullable=True),
        sa.Column("coverage_description", sa.Text, nullable=True),
        sa.Column("max_amount_usd", sa.Numeric(12, 2), nullable=True),
        sa.Column("is_fully_funded", sa.Boolean, server_default=sa.false()),
        sa.Column("eligibility_criteria", sa.Text, nullable=True),
        sa.Column("min_cgpa", sa.Float, nullable=True),
        sa.Column("fields_of_study", sa.String(500), nullable=True),
        sa.Column("nationalities_eligible", sa.Text, nullable=True),
        sa.Column("deadline", sa.Date, nullable=True),
        sa.Column("application_url", sa.String(500), nullable=True),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("is_active", sa.Boolean, server_default=sa.true()),
        sa.Column("is_featured", sa.Boolean, server_default=sa.false()),
        sa.Column("meta_title", sa.String(255), nullable=True),
        sa.Column("meta_description", sa.String(500), nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Scholarship database for student exploration",
    )
    op.create_index("ix_scholarships_country", "scholarships", ["country"])
    op.create_index("ix_scholarships_deadline", "scholarships", ["deadline"])
    op.create_index("ix_scholarships_slug", "scholarships", ["slug"], unique=True)

    # ── leads ─────────────────────────────────────────────────────────────────
    op.create_table(
        "leads",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("full_name", sa.String(255), nullable=False),
        sa.Column("phone", sa.String(20), nullable=True),
        sa.Column("source", sa.String(50), nullable=False),
        sa.Column("utm_source", sa.String(100), nullable=True),
        sa.Column("utm_medium", sa.String(100), nullable=True),
        sa.Column("utm_campaign", sa.String(100), nullable=True),
        sa.Column("page_url", sa.String(500), nullable=True),
        sa.Column("status", sa.String(30), nullable=False, server_default="new"),
        sa.Column("notes", sa.Text, nullable=True),
        sa.Column("counselor_assigned", sa.String(255), nullable=True),
        sa.Column("target_country", sa.String(100), nullable=True),
        sa.Column("target_program", sa.String(255), nullable=True),
        sa.Column("message", sa.Text, nullable=True),
        sa.Column("erpnext_lead_id", sa.String(100), nullable=True),
        sa.Column("crm_synced_at", sa.String(50), nullable=True),
        sa.Column("extra_data", postgresql.JSONB, nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Leads from all acquisition channels",
    )
    op.create_index("ix_leads_email", "leads", ["email"])
    op.create_index("ix_leads_source", "leads", ["source"])
    op.create_index("ix_leads_status", "leads", ["status"])

    # ── lenders ───────────────────────────────────────────────────────────────
    op.create_table(
        "lenders",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("slug", sa.String(300), nullable=False, unique=True),
        sa.Column("logo_url", sa.String(500), nullable=True),
        sa.Column("website_url", sa.String(500), nullable=True),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("lender_type", sa.String(50), nullable=False, server_default="bank"),
        sa.Column("interest_rate_min", sa.Numeric(5, 2), nullable=False),
        sa.Column("interest_rate_max", sa.Numeric(5, 2), nullable=False),
        sa.Column("processing_fee_pct", sa.Numeric(5, 2), nullable=True),
        sa.Column("max_loan_amount_usd", sa.Numeric(14, 2), nullable=False),
        sa.Column("min_loan_amount_usd", sa.Numeric(14, 2), nullable=True),
        sa.Column("moratorium_months", sa.Integer, nullable=True),
        sa.Column("repayment_tenure_months", sa.Integer, nullable=True),
        sa.Column("approval_days", sa.Integer, nullable=True),
        sa.Column("requires_collateral", sa.Boolean, server_default=sa.false()),
        sa.Column("collateral_description", sa.String(500), nullable=True),
        sa.Column("requires_co_applicant", sa.Boolean, server_default=sa.false()),
        sa.Column("min_family_income_usd", sa.Numeric(12, 2), nullable=True),
        sa.Column("eligible_countries", sa.Text, nullable=True),
        sa.Column("eligible_programs", sa.Text, nullable=True),
        sa.Column("is_active", sa.Boolean, server_default=sa.true()),
        sa.Column("is_featured", sa.Boolean, server_default=sa.false()),
        sa.Column("display_order", sa.Integer, server_default="0"),
        sa.Column("cta_url", sa.String(500), nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Education loan lenders for comparison tool",
    )
    op.create_index("ix_lenders_slug", "lenders", ["slug"], unique=True)
    op.create_index("ix_lenders_is_active", "lenders", ["is_active"])

    # ── loan_assessments ──────────────────────────────────────────────────────
    op.create_table(
        "loan_assessments",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("lead_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("leads.id"), nullable=True),
        sa.Column("lender_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("lenders.id"), nullable=True),
        sa.Column("target_country", sa.String(100), nullable=True),
        sa.Column("target_course", sa.String(255), nullable=True),
        sa.Column("target_university", sa.String(255), nullable=True),
        sa.Column("cgpa", sa.Float, nullable=True),
        sa.Column("work_experience_years", sa.Integer, nullable=True),
        sa.Column("family_income_usd", sa.Numeric(12, 2), nullable=True),
        sa.Column("has_co_applicant", sa.Boolean, server_default=sa.false()),
        sa.Column("has_collateral", sa.Boolean, server_default=sa.false()),
        sa.Column("collateral_value_usd", sa.Numeric(12, 2), nullable=True),
        sa.Column("estimated_eligibility_amount", sa.Numeric(14, 2), nullable=True),
        sa.Column("eligible_lender_ids", postgresql.JSONB, nullable=True),
        sa.Column("assessment_result", postgresql.JSONB, nullable=True),
        sa.Column("session_id", sa.String(100), nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Loan eligibility assessment results",
    )
    op.create_index("ix_loan_assessments_lead_id", "loan_assessments", ["lead_id"])

    # ── consultations ─────────────────────────────────────────────────────────
    op.create_table(
        "consultations",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("student_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("counselor_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("scheduled_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("duration_minutes", sa.Integer, nullable=False, server_default="30"),
        sa.Column("consultation_type", sa.String(50), nullable=False, server_default="video"),
        sa.Column("status", sa.String(30), nullable=False, server_default="scheduled"),
        sa.Column("topic", sa.String(255), nullable=True),
        sa.Column("student_notes", sa.Text, nullable=True),
        sa.Column("counselor_notes", sa.Text, nullable=True),
        sa.Column("meeting_link", sa.String(500), nullable=True),
        sa.Column("calcom_booking_id", sa.String(100), nullable=True),
        sa.Column("action_items", sa.Text, nullable=True),
        sa.Column("next_steps", sa.Text, nullable=True),
        sa.Column("rating", sa.Integer, nullable=True),
        sa.Column("feedback", sa.Text, nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Consultation bookings between students and counselors",
    )
    op.create_index("ix_consultations_student_id", "consultations", ["student_id"])
    op.create_index("ix_consultations_counselor_id", "consultations", ["counselor_id"])
    op.create_index("ix_consultations_status", "consultations", ["status"])
    op.create_index("ix_consultations_scheduled_at", "consultations", ["scheduled_at"])

    # ── applications ──────────────────────────────────────────────────────────
    op.create_table(
        "applications",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("student_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("university_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("universities.id", ondelete="SET NULL"), nullable=True),
        sa.Column("program_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("programs.id", ondelete="SET NULL"), nullable=True),
        sa.Column("status", sa.String(50), nullable=False, server_default="lead"),
        sa.Column("intake", sa.String(20), nullable=True),
        sa.Column("intake_year", sa.Integer, nullable=True),
        sa.Column("counselor_notes", sa.Text, nullable=True),
        sa.Column("rejection_reason", sa.Text, nullable=True),
        sa.Column("offer_letter_url", sa.String(500), nullable=True),
        sa.Column("visa_decision", sa.String(50), nullable=True),
        sa.Column("status_history", postgresql.JSONB, nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Student applications with status workflow",
    )
    op.create_index("ix_applications_student_id", "applications", ["student_id"])
    op.create_index("ix_applications_university_id", "applications", ["university_id"])
    op.create_index("ix_applications_status", "applications", ["status"])

    # ── documents ─────────────────────────────────────────────────────────────
    op.create_table(
        "documents",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("owner_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("application_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("applications.id", ondelete="SET NULL"), nullable=True),
        sa.Column("doc_type", sa.String(50), nullable=False),
        sa.Column("original_filename", sa.String(255), nullable=False),
        sa.Column("stored_path", sa.String(500), nullable=False),
        sa.Column("mime_type", sa.String(100), nullable=False),
        sa.Column("file_size_bytes", sa.BigInteger, nullable=False),
        sa.Column("checksum_sha256", sa.String(64), nullable=True),
        sa.Column("is_verified", sa.Boolean, server_default=sa.false()),
        sa.Column("verified_by", sa.String(36), nullable=True),
        sa.Column("notes", sa.String(500), nullable=True),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("updated_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        comment="Uploaded student documents with role-based access",
    )
    op.create_index("ix_documents_owner_id", "documents", ["owner_id"])
    op.create_index("ix_documents_doc_type", "documents", ["doc_type"])


def downgrade() -> None:
    op.drop_table("documents")
    op.drop_table("applications")
    op.drop_table("consultations")
    op.drop_table("loan_assessments")
    op.drop_table("lenders")
    op.drop_table("leads")
    op.drop_table("scholarships")
    op.drop_table("programs")
    op.drop_table("universities")
    op.drop_table("students")
    op.drop_table("users")
